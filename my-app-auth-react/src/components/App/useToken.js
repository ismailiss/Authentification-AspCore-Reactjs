import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";
export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        console.log(tokenString);
        if (tokenString) {
            let decodedToken = jwt_decode(tokenString);
            let currentDate = new Date();
            if (decodedToken.exp * 1000 < currentDate.getTime()) {
                console.log("Token expired.");
                setToken(null);
                localStorage.removeItem("token");

            } else {
                console.log("Valid token");
                setToken(JSON.parse(tokenString))

            }
        }
        else {
            localStorage.removeItem("token");
            setToken(null);
        }

    };

    const [token, setToken] = useState("");


    useEffect(() => {
        getToken();
    }, [token])
    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };

    return {
        setToken: saveToken,
        token
    }
}