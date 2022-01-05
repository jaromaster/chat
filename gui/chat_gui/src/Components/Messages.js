import React from 'react';
import Message from './Message';
import "./Messages.css";

// container for all messages in chat
const Messages = (props) => {

    return (
        <div className="messagesDiv">
            <ul>
                {
                    // display all messages
                    props.messages.map((el,i)=>{
                        return <li key={i}><Message message={el}></Message></li>
                    })
                }
            </ul>
        </div>
    )
}

export default Messages;