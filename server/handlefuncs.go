package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

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

	// login (return path to chats of user)

	// for now, just general chats page
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	resp := make(map[string]string)
	resp["path"] = "/chats"
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Write(jsonResp)
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

// simple function to send text to frontend
func writeText(w http.ResponseWriter, code int, message []byte) {
	w.WriteHeader(code)
	_, err := w.Write(message)
	if err != nil {
		fmt.Println(err)
	}
}
