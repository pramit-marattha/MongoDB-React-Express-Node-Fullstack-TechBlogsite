import fetch from "isomorphic-fetch";
import {API} from "../config.js";
import cookie from "js-cookie";

export const createBlog = (blog,token) => {
    return fetch(`${API}/api/blog`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization:`Bearer ${token}`

        },
        body: blog
    })
        .then(response => {
            return response.json();
        })
        .catch(error => console.log(error));
};