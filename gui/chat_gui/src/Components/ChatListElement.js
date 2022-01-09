import React from 'react';
import "./ChatListElement.css";

const ChatListElement = (props) => {
    return (
        <div className="chatListElDiv">
            <h2>{props.name}</h2>
        </div>
    )
}

export default ChatListElement;