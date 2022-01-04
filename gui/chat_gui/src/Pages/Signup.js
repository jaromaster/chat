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
        axios.post("/signupdata", credentials)
        .then(response => {
            console.log(response.data); 
            
            // handle response
            // determine if signup was successful
            if(response.status === 201) {
                alert("Sign up successful");
                const url = "/login";
                window.location.href = url;
            }
        })
        .catch((err) => {
            // server response: 409 (status conflict)
            alert("Username already taken!");
            console.log("error: post request to /signupdata failed")
        })
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