import React, { useState } from 'react';
import "./DirectChat.css";
import Messages from '../Components/Messages';
import WriteMessage from '../Components/WriteMessage';

// site for direct chatting between to users
const DirectChat = () => {
    const otherUser = "Some other user";
    const username = "self"; // get own username

    // dummy data to display
    const [messages, setMessages] = useState([
        {from: otherUser, to: username, text: "hi", date: "2021-01-5", time: "20:30:00"},
        {from: username, to: otherUser, text: "hi", date: "2021-01-5", time: "20:31:00"},
        {from: otherUser, to: username, text: "how are you", date: "2021-01-5", time: "20:35:00"},
        {from: username, to: otherUser, text: "i'm fine thx", date: "2021-01-5", time: "20:30:00"},
    ]);
    let newMessage = "";
    let ws = new WebSocket(`ws://${window.location.host}/sendmessage`);

    // close websocket if still open and page reloaded
    window.onbeforeunload = () => {
        ws.close();
    }

    
    // called when users types in text field
    const handleMessageTyped = (e) => {
        newMessage = e.target.value;
    }


    // called when user sends message
    const handleMessageSent = (e) => {
        const messageJSON = compileMessageJSON(newMessage);
        let messagesCopy = [...messages];
        messagesCopy.push(messageJSON);
        
        setMessages(messagesCopy); // update state
        
        sendMessage(messageJSON); // send (websocket)
    }

    // format date to: yyyy-mm-dd
    const getFormattedDate = () => {
        let date = new Date();
        let year = date.getFullYear().toString();
        let month = date.getMonth()+1;
        month.toString();
        let day = date.getDate().toString();

        if (month.toString().length === 1){
            month = "0" + month;
        }
        if (day.toString().length === 1){
            day = "0" + day;
        }

        return `${year}-${month}-${day}`;
    }

    // get formatted time, format: hh:mm:ss
    const getFormattedTime = () => {
        let date = new Date();
        let hour = date.getHours().toString();
        let minute = date.getMinutes().toString();
        let second = date.getSeconds().toString();

        if (hour.toString().length === 1){
            hour = "0" + hour;
        }
        if (minute.toString().length === 1){
            minute = "0" + minute;
        }
        if (second.toString().length === 1){
            second = "0" + second;
        }

        return `${hour}:${minute}:${second}`;
    }

    // compile message and needed values to single JSON
    const compileMessageJSON = (message) => {
        const from = username; // get username
        const to = otherUser; // get target username
        const date = getFormattedDate();
        const time = getFormattedTime();
        const text = message;

        // message to json
        // {from: "own username", to: "otherUser", date: "yyyy-mm-dd", time: "hh:mm:ss", text: "message"}
        let messageJSON = {
            from: from,
            to: to,
            date: date,
            time: time,
            text: text
        }
        return messageJSON;
    }

    // send message from text field to backend
    const sendMessage = (messageJSON) => {

        // send message using websockets
        ws.onopen = (e) => {
            console.log("opened websocket");
        }
        ws.onclose = (e) => {
            console.log("closed websocket");
        }
        ws.onmessage = (e) => {
            console.log(e.data);
        }

        try {
            ws.send(JSON.stringify(messageJSON)); // send json as string
        } catch (error) {
            alert(error);
        }
        
        // ws.close();
    }

    return (
        <div className="directChatDiv">
            <h1>{otherUser}</h1>

            <Messages messages={messages} username={username} otherUser={otherUser}></Messages>
            <WriteMessage handleMessageSent={handleMessageSent} handleMessageTyped={handleMessageTyped}></WriteMessage>      
        </div>
    )
}

export default DirectChat;