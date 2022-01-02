import React from 'react'
import axios from "axios";
import LoginForm from '../Components/LoginForm';
import "./Login.css";

// Login Page
const Login = () => {
    let username = "";
    let password = "";

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
        console.log(credentials);

        // send credentials to backend
        axios.post("/logindata", credentials)
        .then(response => {
            console.log(response.data); // handle response
        })
        .catch((err) => {
            console.log("error: post request to /logindata failed")
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