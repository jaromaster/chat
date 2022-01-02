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

	// init database
	users = NewUserDB(dbPath)
	users.Init()

	// handle post requests
	router.HandleFunc("/logindata", HandleLogin)
	router.HandleFunc("/signupdata", HandleSignup)

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

	// print user
	fmt.Println(u)

	// check if password is correct
	correct := users.CheckPassword(u)
	fmt.Println("password of user "+u.Username+" is correct: ", correct)

	// login
}

// handle sign ups
func HandleSignup(w http.ResponseWriter, r *http.Request) {
	var u User

	decoder := json.NewDecoder(r.Body)
	decoder.DisallowUnknownFields()
	err := decoder.Decode(&u)
	if err != nil {
		fmt.Println(err)
		return
	}

	// print user
	fmt.Println("New User: ", u)

	// persist user and password (database/file)
	err = users.StoreUser(u)
	if err != nil {
		fmt.Println(err)
		fmt.Println(u, "could not be stored to db")
		return
	}

	fmt.Println("stored user: " + u.Username)

	// redirect to login page
}
