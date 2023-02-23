import React, { useState, useEffect } from 'react';
import './Login.css'
import PropTypes from 'prop-types';

export default function Login({ setToken }) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    /*Get data from api*/
    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(userName, password);
     

           // Example usage:
      postData('https://localhost:5001/api/Auth/Login', {"Username": userName, "Password": password})
      .then(data => {
        console.log(data); // Success! Data is returned in JSON format.
        setToken(data.token);

      })
      .catch(error => {
        console.error('Error:', error);
      });

    }

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST', // or 'PUT'
          mode: 'cors',
          cache: 'no-cache',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow',
          referrerPolicy: 'no-referrer',
          body: JSON.stringify(data)
        });
        return response.json();
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

