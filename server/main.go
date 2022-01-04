package main

import (
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
