import fetch from "isomorphic-fetch";
import {API} from "../config.js";

export const signup = (user) => {
    return fetch(`${API}/api/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};