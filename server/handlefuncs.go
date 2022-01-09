package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
)

// struct containing claims (for token)
type tokenClaims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// handle login attempt
func HandleLogin(w http.ResponseWriter, r *http.Request) {
	var u User

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&u)
	if err != nil {
		fmt.Println(err)
		return
	}

	// check if password is correct
	correct := users.CheckPassword(u)
	fmt.Println("password of user "+u.Username+" is correct: ", correct)

	// inform frontend about failed login
	if !correct {
		writeText(w, http.StatusUnauthorized, []byte("login failed, username or password incorrect"))
		return
	}

	// JWT ----------------------

	// create token claims
	claims := tokenClaims{
		Username: u.Username,
		StandardClaims: jwt.StandardClaims{
			Issuer:    "chat", // this website
			ExpiresAt: time.Now().Add(1 * time.Hour).Unix(),
		},
	}

	// create jwt token for user
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	// read in private key
	privateKey, err := ioutil.ReadFile(KEYPATH)
	if err != nil {
		fmt.Println(err)
		return
	}
	// sign token with private key
	signedToken, err := token.SignedString(privateKey)
	if err != nil {
		fmt.Println(err)
		return
	}

	// send token to user
	writeText(w, http.StatusAccepted, []byte(signedToken))
}

// handle sign ups
func HandleSignup(w http.ResponseWriter, r *http.Request) {
	var u User

	success := true
	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&u)
	if err != nil {
		fmt.Println(err)
		success = false
		return
	}

	// check if user already exists
	exists := users.CheckUserExists(u)
	if exists {
		writeText(w, http.StatusConflict, []byte("user already exists"))
		return
	}

	// persist user and password (database/file)
	err = users.StoreUser(u)
	if err != nil {
		fmt.Println(u, "could not be stored to db")
		success = false
		return
	}

	// error(s)
	if !success {
		writeText(w, http.StatusInternalServerError, []byte("sign up failed"))
		return
	}

	fmt.Println("stored user: " + u.Username)

	// inform frontend about successful sign up
	writeText(w, http.StatusCreated, []byte("account created"))
}

// check if given user (json: {username: "someusername"}) exists
func HandleCheckUserExists(w http.ResponseWriter, r *http.Request) {
	var u User

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&u)
	if err != nil {
		fmt.Println(err)
		return
	}

	// check if exists
	exists := users.CheckUserExists(u)
	fmt.Println("user already exists: ", exists)

	// send response
	if !exists {
		writeText(w, http.StatusNotFound, []byte("user not found"))
	} else {
		writeText(w, http.StatusOK, []byte("user found"))
	}
}

// check if token is valid and return username
func ValidateToken(token []byte) string {
	// parse token from bytes
	parsedToken, err := jwt.ParseWithClaims(string(token[:]), &tokenClaims{},
		func(t *jwt.Token) (interface{}, error) {
			key, err := ioutil.ReadFile(KEYPATH) // get private key
			return key, err
		},
	)
	if err != nil {
		fmt.Println(err)
		return ""
	}
	// parse claims
	claims, ok := parsedToken.Claims.(*tokenClaims)
	if !ok {
		fmt.Println("parsing claims not ok")
		return ""
	}

	// check for expiration
	if claims.ExpiresAt < time.Now().UTC().Unix() {
		fmt.Println("token expired")
		return ""
	}

	username := claims.Username
	fmt.Println("Username [", username, "] sent token to get his chats")
	return username
}

// send chat of specific user to frontend
func HandleGetUserChat(w http.ResponseWriter, r *http.Request) {
	tokenBytes, err := io.ReadAll(r.Body)
	if err != nil {
		return
	}

	// validate token
	username := ValidateToken(tokenBytes)
	if username == "" {
		writeText(w, http.StatusUnauthorized, []byte("invalid token"))
		return
	}

	jsonMap := make(map[string]interface{})
	jsonMap["username"] = username
	jsonMap["chats"] = [4]string{"user1", "user2", "uesr3", "user4"} // add list of chats (for now just dummy data) to map
	writeJSON(w, http.StatusAccepted, jsonMap)

	// writeText(w, http.StatusAccepted, []byte(username+", here are your chats:")) // send chats
	// get all chats of user (read from file system)
	// send chats as json
}

// simple function to send text to frontend
func writeText(w http.ResponseWriter, code int, message []byte) {
	w.WriteHeader(code)
	_, err := w.Write(message)
	if err != nil {
		fmt.Println(err)
	}
}

// send json to frontend
func writeJSON(w http.ResponseWriter, code int, jsonMap map[string]interface{}) {
	w.WriteHeader(code)
	w.Header().Set("Content-Type", "application/json")
	jsonBytes, err := json.Marshal(jsonMap)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Write(jsonBytes)
}
