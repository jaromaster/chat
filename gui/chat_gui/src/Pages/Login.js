import React from 'react'
import axios from "axios";
import LoginForm from '../Components/LoginForm';
import "./Login.css";

// Login Page
const Login = () => {
    let username = "";
    let password = "";
    let token = "";

    // get username
    const handleNameInput = (e) => {
        username = e.target.value;
    }

    // get password
    const handlePasswordInput = (e) => {
        password = e.target.value;
    }

    // handle if user presses login button
    const handleLogin = (e) => {
        e.preventDefault();

        if (username === ""){
            alert("Username not valid");
            return;
        }
        if (password === ""){
            alert("Password not valid");
            return;
        }

        const credentials = {username: username, password: password};

        // send credentials to backend
        axios.post("/logindata", credentials)
        .then(response => {
            // backend responds with token

            // get jwt token in return
            if(response.status === 202) {
                alert("login successful");
                token = response.data;

                document.cookie = token; // set cookie to token
                window.location.href = "/chats";
            }
        })
        .catch((err) => {
            // e.g. if response status code is 401 (Unautorized)
            alert("Username or Password incorrect");
        })
    }

    // handle if user presses sign up button
    const handleSignup = (e) => {
        e.preventDefault();

        window.location.href = "/signup"; // redirect to sign up page
    }


    return (
        <div className="loginDiv">
            <h1>Login Page</h1>
            <LoginForm handleNameInput={handleNameInput} handlePasswordInput={handlePasswordInput} handleLogin={handleLogin} handleSignup={handleSignup}></LoginForm>
        </div>
    )
}

export default Login;