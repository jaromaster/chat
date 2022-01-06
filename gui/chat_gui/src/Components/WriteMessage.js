import React from 'react';
import "./WriteMessage.css";

// textfield to send messages
const WriteMessage = (props) => {

    // clear input
    const clearInput = () => {
        document.getElementById("messageInput").value = ""; // clear input
    }

    // acts like button click when user presses enter
    const handleEnter = (e) => {
        if (e.key === "Enter") {
            props.handleMessageSent(e);
            clearInput();
        }
    }

    return (
        <div className="writeMessageDiv">
            <input id="messageInput" type="text" onChange={props.handleMessageTyped} onKeyPress={handleEnter}></input>
            <button onClick={(e) => {
                props.handleMessageSent(e);
                clearInput();
            }}>Send</button>
        </div>
    )
}

export default WriteMessage;