package main

import (
	"database/sql"
	"errors"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
)

// UserDB handles all users (e.g. CRUD operations)
type UserDB struct {
	Path     string
	Database *sql.DB
}

// create new UserDB and return it
func NewUserDB(path string) UserDB {
	db, err := sql.Open("sqlite3", path)
	if err != nil {
		fmt.Println(err)
	}

	newDB := UserDB{Path: path, Database: db}

	return newDB
}

// initialize Database
// create table users
func (db *UserDB) Init() error {
	query := `
	CREATE TABLE IF NOT EXISTS users(
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT NOT NULL UNIQUE,
		password TEXT NOT NULL
	);
	`
	_, err := db.Database.Exec(query)
	if err != nil {
		return err
	}
	return nil
}

// store user in db
// (username, password)
func (db *UserDB) StoreUser(u User) error {
	const query string = "INSERT INTO users (username, password) VALUES (?, ?);"
	stmt, err := db.Database.Prepare(query)
	if err != nil {
		fmt.Println("error: storing user (prepared statement)")
		return err
	}

	_, err = stmt.Exec(u.Username, u.GetPasswdHash())
	if err != nil {
		fmt.Println(query)
		return err
	}

	return nil
}

// check if current user has correct password
func (db *UserDB) CheckPassword(u User) bool {
	const query string = "SELECT * FROM users WHERE username=? AND password=?;"
	stmt, err := db.Database.Prepare(query)
	if err != nil {
		fmt.Println("error: checking password (prepared statement)")
		return false
	}

	res := stmt.QueryRow(u.Username, u.GetPasswdHash()) // get row

	// if result empty => password or username not correct

	var newUser User

	err = res.Scan(&newUser.Username, &newUser.Password)
	if errors.Is(err, sql.ErrNoRows) {
		fmt.Println("error: checking password (executing query)")
		return false
	}

	return true
}
