import React from 'react';
import "./NewChat.css";

// find user to create new chat
const NewChat = (props) => {


    return (
        <div className="newChat">
            <label>New Chat</label>
            <input type="text" onChange={props.handleNameInput}></input>
            <input type="submit" value="Search" onClick={props.handleSearch}></input>
        </div>
    )
}

export default NewChat;