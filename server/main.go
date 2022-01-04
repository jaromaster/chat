package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

// constants
const dbPath = "users.db"

// global variables
var users UserDB

func main() {
	router := mux.NewRouter()

	// init user database
	users = NewUserDB(dbPath)
	users.Init()

	// handle post requests
	router.HandleFunc("/logindata", HandleLogin)
	router.HandleFunc("/signupdata", HandleSignup)
	router.HandleFunc("/userexists", HandleCheckUserExists)

	// static file server (for react app)
	spa := SpaHandler{staticPath: "../gui/chat_gui/build", indexPath: "index.html"}
	router.PathPrefix("/").Handler(spa)

	// http server
	s := &http.Server{
		Handler: router,
		Addr:    "127.0.0.1:8000",
		// timeouts
		WriteTimeout: 10 * time.Second,
		ReadTimeout:  10 * time.Second,
	}

	log.Fatal(s.ListenAndServe())
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
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Login failed, Username or Password incorrect"))
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
		w.WriteHeader(http.StatusConflict)
		w.Write([]byte("user already exists"))
		return
	}

	// persist user and password (database/file)
	err = users.StoreUser(u)
	if err != nil {
		fmt.Println(u, "could not be stored to db")
		success = false
		return
	}

	// some error(s)
	if !success {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Sign up failed"))
		return
	}

	fmt.Println("stored user: " + u.Username)

	// inform frontend about successful sign up
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte("account created"))
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
		w.WriteHeader(http.StatusNotFound)
		w.Write([]byte("user not found"))
	} else {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("user found"))
	}
}
