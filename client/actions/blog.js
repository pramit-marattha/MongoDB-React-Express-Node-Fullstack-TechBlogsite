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

export const listBlogsWithCategoriesAndTaglists = (skip,limit) => {
    const data ={
        limit,skip
    }
    return fetch(`${API}/api/bloglists-categories-taglists`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
            return response.json();
        }).catch(error => console.log(error));
};


export const singleBlog = slug =>{
    return fetch(`${API}/api/blog/${slug}`,{
        method: 'GET'
    }).then(response=>{
        return response.json()
    }).catch(err => console.log(err))
}