import React, { useState, useEffect } from 'react';
import axios from "axios";
import NewChat from '../Components/NewChat';
import "./Chats.css";

// Display user's chats
const Chats = () => {
    const [ownUsername, setOwnUsername] = useState("");
    const [chats, setChats] = useState([]);

    let username = "";

    // send token (cookie) to backend to get user's chats
    useEffect(() => {
        axios.post("/getuserchat", document.cookie)
        .then(response => {
            // response format: {username: "somename", chats: [chat1, chat2, chat3]}

            console.log(response.data);
            setOwnUsername(response.data.username)
            setChats(response.data.chats)
        })
        .catch(err => {
            alert("error sending cookie (token)");
            console.log(err)
        })
    }, [])

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
                console.log(document.cookie)
            }
        })
        .catch(err => {
            alert("User not found");
        })
    }

    return (
        <div className="chatsDiv">
            <h2>Hi {ownUsername}!</h2>
            <h1>Your Chats</h1>
            <NewChat handleNameInput={handleNameInput} handleSearch={handleSearch}></NewChat>
            <ul>
            {
                chats.map((e,i)=>{
                    return <li key={i}>{e}</li> //display chats
                })
            }
            </ul>
        </div>
    )
}

export default Chats;