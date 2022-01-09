package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

// handle interrupts, close connections
func HandleClosed(srv *http.Server) {
	channel := make(chan os.Signal, 2)
	signal.Notify(channel, os.Interrupt, syscall.SIGTERM)
	go func() {
		<-channel // wait for signal
		fmt.Println()
		srv.Shutdown(context.TODO())

		// TODO: close other open connections

		fmt.Println("\rStopped server")
		os.Exit(0)
	}()
}
