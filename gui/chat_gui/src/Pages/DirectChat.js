import React from 'react';
import "./DirectChat.css";
import Messages from '../Components/Messages';
import WriteMessage from '../Components/WriteMessage';

// site for direct chatting between to users
const DirectChat = () => {
    const otherUser = "Some other user";
    let newMessage = "";

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
    
    // called when users types in text field
    const handleMessageTyped = (e) => {
        newMessage = e.target.value;
    }


    // called when user sends message
    const handleMessageSent = (e) => {
        alert(newMessage);
    }

    return (
        <div className="directChatDiv">
            <h1>{otherUser}</h1>

            <Messages messages={messages}></Messages>
            <WriteMessage handleMessageSent={handleMessageSent} handleMessageTyped={handleMessageTyped}></WriteMessage>      
        </div>
    )
}

export default DirectChat;