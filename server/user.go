package main

import (
	"crypto/sha256"
	"fmt"
)

// user struct to use with db
type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// use sha256 to hash password
func (u *User) GetPasswdHash() string {
	hash := sha256.Sum256([]byte(u.Password))

	return fmt.Sprintf("%x", hash[:]) // byte array to hex string
}
