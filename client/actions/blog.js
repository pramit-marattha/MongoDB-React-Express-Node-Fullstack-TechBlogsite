import fetch from "isomorphic-fetch";
import { API } from "../config.js";

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

export const listBlogsWithCategoriesAndTaglists = (blog,token) => {
    return fetch(`${API}/api/bloglists-categories-taglists`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
        }
    }).then(response => {
            return response.json();
        }).catch(error => console.log(error));
};