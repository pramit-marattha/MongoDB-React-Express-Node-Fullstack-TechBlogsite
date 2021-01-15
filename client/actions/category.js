import fetch from "isomorphic-fetch";
import {API} from "../config.js";
import cookie from "js-cookie";

export const create = (category,token) => {
    return fetch(`${API}/api/category`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization:`Bearer ${token}`

        },
        body: JSON.stringify(category)
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};
