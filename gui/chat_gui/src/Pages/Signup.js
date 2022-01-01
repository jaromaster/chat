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
        alert("valid")

        // send credentials to backend
        axios.post("/signupdata", credentials)
        .then(response => {
            console.log(response.data); // handle response
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