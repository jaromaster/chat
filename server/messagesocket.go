package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// handle incoming messages over websocket
func handleMessageSocket(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer conn.Close()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			fmt.Println(err)
			conn.WriteMessage(messageType, []byte("something went wrong when sending message"))
			break
		}
		err = conn.WriteMessage(messageType, []byte("successful"))
		if err != nil {
			fmt.Println(err)
			return
		}

		// load bytes into m (message struct)
		var m Message
		err = json.Unmarshal(message, &m)
		if err != nil {
			fmt.Println(err)
			return
		}

		// for testing
		// fmt.Printf("received message: %s\n", message)
		// fmt.Printf("From: %s, To: %s, Date: %s, Time: %s, Text: %s", m.From, m.To, m.Date, m.Time, m.Text)

		fmt.Println(m.Text)
	}
}
