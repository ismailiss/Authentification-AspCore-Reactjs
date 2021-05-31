import { useState, useEffect } from 'react';

export default function useToken() {

    const getToken = () => {
        const tokenString = localStorage .getItem('token');
        const userToken = JSON.parse(tokenString);
        setToken(userToken)
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