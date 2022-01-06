import React from 'react';
import "./DirectChat.css";
import Messages from '../Components/Messages';
import WriteMessage from '../Components/WriteMessage';

// site for direct chatting between to users
const DirectChat = (props) => {
    const otherUser = "Some other user";
    let newMessage = "";
    let ws = new WebSocket(`ws://${window.location.host}/sendmessage`);

    // close websocket if still open and page reloaded
    window.onbeforeunload = () => {
        ws.close();
    }

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
        sendMessage(newMessage);
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

    // send message from text field to backend
    const sendMessage = (message) => {

        const from = "self"; // get username
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

            <Messages messages={messages}></Messages>
            <WriteMessage handleMessageSent={handleMessageSent} handleMessageTyped={handleMessageTyped}></WriteMessage>      
        </div>
    )
}

export default DirectChat;