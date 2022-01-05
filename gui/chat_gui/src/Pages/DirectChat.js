import React from 'react';
import "./DirectChat.css";
import Messages from '../Components/Messages';

// site for direct chatting between to users
const DirectChat = () => {
    let otherUser = "Some other user";
    // dummy data to display
    let messages = [
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
        {sender: "other", text: "hi", date: "2021-01-5", time: "20:30:00"},
        {sender: "self", text: "hi", date: "2021-01-5", time: "20:31:00"},
        {sender: "other", text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {sender: "self", text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
    ]
    
    return (
        <div className="directChatDiv">
            <h1>{otherUser}</h1>
            <div>
                <Messages messages={messages}></Messages>
            </div>
            <div>
                {/* Input field to write new message */}          
            </div>
        </div>
    )
}

export default DirectChat;