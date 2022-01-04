import React from 'react'
import "./SignupForm.css"

// Get user input
const SignupForm = (props) => {
    return (
        <div>
            <form className="signupForm">
                <label htmlFor="nameInput">Username:</label><br></br>
                <input id="nameInput" type="text" onChange={props.handleNameInput} required></input><br></br>

                <label htmlFor="passwdInput">Password:</label><br></br>
                <input id="passwdInput" type="password" onChange={props.handlePasswordInput} required></input><br></br>

                <label htmlFor="passwdInput2">Repeat Password:</label><br></br>
                <input id="passwdInput2" type="password" onChange={props.handleRepeatedPasswordInput} required></input><br></br>

                <input type="submit" value="Sign up" onClick={props.handleSignup}></input>
            </form>   
        </div>
    )
}

export default SignupForm;