import React from 'react';
import "./NoPage.css";

// shows up whenever page is not found
// contains links to login and sign up pages
const NoPage = () => {
    return (
        <div className="noPageDiv">
            <h1>Sorry, this page does not exist</h1>
            <p>Click <a href="/login">here</a> to go to the login page.</p>
            <p>Or <a href="/signup">here</a> to create an account.</p>
        </div>
    )
}

export default NoPage;