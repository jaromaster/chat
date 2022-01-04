import React from 'react';
import "./DirectChat.css";

// site for direct chatting between to users
const DirectChat = () => {
    let otherUser = "Some other user";
    
    return (
        <div className="directChatDiv">
            <h1>{otherUser}</h1>
            <div>
                {/* Chat containing all messages */}
            </div>
            <div>
                {/* Input field to write new message */}
            </div>
        </div>
    )
}

export default DirectChat;