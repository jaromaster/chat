import React from 'react'
import SignupForm from '../Components/SignupForm'
import axios from "axios"
import "./Signup.css"

const Signup = () => {
    let username = "";
    let password = "";
    let repeatedPassword = "";

    // get username
    const handleNameInput = (e) => {
        username = e.target.value;
    }

    // get password
    const handlePasswordInput = (e) => {
        password = e.target.value;
    }

    // get repeated password
    const handleRepeatedPasswordInput = (e) => {
        repeatedPassword = e.target.value;
    }

    // handle if user presses login button
    const handleSignup = (e) => {
        e.preventDefault();

        if (username === ""){
            alert("Username not valid");
            return;
        }
        if (password === ""){
            alert("Password not valid");
            return;
        }
        if (password !== repeatedPassword){
            alert("Passwords do not match");
            return;
        }

        const credentials = {username: username, password: password};

        // send credentials to backend
        let successful = true;
        axios.post("/signupdata", credentials)
        .then(response => {
            console.log(response.data); 
            
            // handle response
            // determine if signup was successful

        })
        .catch((err) => {
            console.log("error: post request to /signupdata failed")
            successful = false;
        })

        // on success: alert, redirect to login page
        if(successful) {
            alert("Account created, please log in");
            window.location.href = "/login";
        }
    }


    return (
        <div className="signupDiv">
            <h1>Sign Up</h1>
            <SignupForm handleNameInput={handleNameInput} handlePasswordInput={handlePasswordInput}
            handleRepeatedPasswordInput={handleRepeatedPasswordInput} handleSignup={handleSignup}></SignupForm>
        </div>
    )
}

export default Signup;