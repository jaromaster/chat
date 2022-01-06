import React, { useEffect } from 'react';

import Message from './Message';
import "./Messages.css";

// container for all messages in chat
const Messages = (props) => {
    const username = props.username;
    const otherUser = props.otherUser;

    useEffect(() => {
        // scroll automatically
        let divScrolling = document.getElementById('messagesDiv');
        divScrolling.scroll({ top: divScrolling.scrollHeight, behavior: 'smooth' });
    })

    return (
        <div className="messagesDiv" id="messagesDiv">
            <ul>
                {
                    // display all messages
                    props.messages.map((el,i)=>{
                        return <li key={i}><Message message={el} username={username}></Message></li>
                    })
                }
            </ul>
        </div>
    )
}

export default Messages;