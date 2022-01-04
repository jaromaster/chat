import React from 'react'
import "./LoginForm.css"

// Get user input
const LoginForm = (props) => {
    return (
        <div>
            <form className="loginForm">
                <label htmlFor="nameInput">Username:</label><br></br>
                <input id="nameInput" type="text" onChange={props.handleNameInput} required></input><br></br>

                <label htmlFor="passwdInput">Password:</label><br></br>
                <input id="passwdInput" type="password" onChange={props.handlePasswordInput} required></input><br></br>

                <input type="submit" value="Login" onClick={props.handleLogin}></input>
                <input type="submit" value="Sign up" onClick={props.handleSignup}></input>
            </form>   
        </div>
    )
}

export default LoginForm;