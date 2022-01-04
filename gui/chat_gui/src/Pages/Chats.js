import React from 'react';
import axios from "axios";
import NewChat from '../Components/NewChat';
import "./Chats.css";

// Display user's chats
const Chats = () => {
    let username = "";

    // handle user input
    const handleNameInput = (e) => {
        username = e.target.value;
    }

    // handle submission of username
    const handleSearch = (e) => {
        e.preventDefault();
        const data = {username: username};


        // ask backend if user exists
        axios.post("/userexists", data)
        .then(response => {
            // user exists -> start new chat
            if (response.data === "user found"){
                alert("User found");
                // redirect
            }
        })
        .catch(err => {
            alert("User not found");
        })
    }

    return (
        <div className="chatsDiv">
            <h1>Your Chats</h1>
            <NewChat handleNameInput={handleNameInput} handleSearch={handleSearch}></NewChat>
        </div>
    )
}

export default Chats;