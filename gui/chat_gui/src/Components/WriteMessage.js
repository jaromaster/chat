import React from 'react';
import "./WriteMessage.css";

// textfield to send messages
const WriteMessage = (props) => {
    return (
        <div className="writeMessageDiv">
            <input type="text" onChange={props.handleMessageTyped}></input>
            <button onClick={props.handleMessageSent}>Send</button>
        </div>
    )
}

export default WriteMessage;