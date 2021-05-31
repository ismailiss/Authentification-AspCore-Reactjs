import React, { useState, useEffect } from 'react';
import './Login.css'
import PropTypes from 'prop-types';

export default function Login({ setToken }) {
    const [userName, setUserName] = useState("ismail2020");
    const [password, setPassword] = useState("ismail@2020");

    /*Get data from api*/
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(userName, password);
        let body = ({
            "Username": userName,
            "Password": password
        });
        console.log(body);
        const response = await fetch("https://localhost:5001/api/Auth/login",
            {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(body)
            });
        const data = await response.json();
        setToken(data.token);
    }

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>
                        Username
                <input type="text" onChange={(e) => setUserName(e.target.value)} />
                    </label>
                </p>
                <p>
                    <label>
                        Password
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </p>

                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div >
    )
}
Login.propTypes = {
    setToken: PropTypes.func.isRequired
};