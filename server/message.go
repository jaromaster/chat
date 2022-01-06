package main

// the message struct is used to work with messages sent over websockets
type Message struct {
	From string `json:"from"`
	To   string `json:"to"`
	Date string `json:"date"`
	Time string `json:"time"`
	Text string `json:"text"`
}
