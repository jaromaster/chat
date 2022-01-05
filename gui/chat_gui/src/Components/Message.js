import React from 'react';
import "./Message.css";

// a single message to display time, date, text
const Message = (props) => {
    let message = props.message;

    // message colors
    const sentMessageColor = "#37dce8";
    const recvMessageColor = "#2f9136";

    // sender is self: green, else blue
    let backgroundColor = sentMessageColor;
    if (message.sender === "self") {
        backgroundColor = recvMessageColor;
    }

    // formatted
    const shortTime = message.time.substr(0,message.time.length-3);

    return (
        <div className="message" 
        style={{textAlign: message.sender === "self" ? "right" : "left"}}>

            <div className="messageTextDiv" style={{
                backgroundColor: backgroundColor, 
                float: message.sender === "self" ? "right" : "left"}}>
                <h4>{message.date}, {shortTime}</h4>
                <p>{message.text}</p>
            </div>
        </div>
    )
}

export default Message;