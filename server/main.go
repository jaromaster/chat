package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

// constants
const dbPath = "users.db"
const PORT = 8000
const CERTPATH = "tls/chat-server.crt"
const KEYPATH = "tls/chat-server.key"
const STATICPATH = "../gui/chat_gui/build" // path to react app
const INDEXPATH = "index.html"             // path of index.html (react app)

// global variables
var users UserDB
var upgrader websocket.Upgrader

func main() {
	router := mux.NewRouter()

	// init user database
	users = NewUserDB(dbPath)
	err := users.Init()
	if err != nil {
		log.Fatal(err)
	}

	// upgrades to websocket
	upgrader = websocket.Upgrader{}
	// NOT SECURE - FIX!
	upgrader.CheckOrigin = func(r *http.Request) bool {
		return true
	}

	// handle post requests
	router.HandleFunc("/logindata", HandleLogin)
	router.HandleFunc("/signupdata", HandleSignup)
	router.HandleFunc("/userexists", HandleCheckUserExists)
	router.HandleFunc("/getuserchat", HandleGetUserChat)

	// handle websocket(s)
	router.HandleFunc("/sendmessage", handleMessageSocket)

	// static file server (for react app)
	spa := SpaHandler{staticPath: STATICPATH, indexPath: INDEXPATH}
	router.PathPrefix("/").Handler(spa)

	// https server
	s := &http.Server{Handler: router, Addr: fmt.Sprintf(":%d", PORT)}
	s.WriteTimeout = 10 * time.Second
	s.ReadTimeout = 10 * time.Second

	// handle ctrl+c
	HandleClosed(s)

	err = s.ListenAndServeTLS(CERTPATH, KEYPATH)
	if err != nil {
		log.Fatal(err)
	}
}
