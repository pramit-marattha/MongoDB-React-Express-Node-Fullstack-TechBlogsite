import fetch from "isomorphic-fetch";
import {API} from "../config.js";
import cookie from "js-cookie";

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

export const login = (user) => {
    return fetch(`${API}/api/login`, {
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

export const logout =(next) =>{
    removeCookie('token')
    removeLocalStorage('user')
    next();

    return fetch(`${API}/api/logout`,{
        method: "GET"
    }).then(response =>{
        console.log("Successfully Logged Out")
    }).catch(err=> console.log(err))
}

// setting the cookie
export const setCookie = (key,value)=>{
    if(process.browser){
        cookie.set(key,value,{
            expires:365
        });
    }
};

// removing the cookie
export const removeCookie = (key)=>{
    if(process.browser){
        cookie.remove(key,{
            expires:365
        });
    }
};

// getting the cookie
export const getCookie = (key)=>{
    if(process.browser){
       return cookie.get(key);
    }
};

// setting up localstorage
export const setLocalStorage = (key,value) =>{
    if(process.browser){
        localStorage.setItem(key,JSON.stringify(value))
    }
};

// removing localstorage
export const removeLocalStorage = (key) =>{
    if(process.browser){
        localStorage.removeItem(key)
    }
};

// authentication of user by passing data to cookie as well as localstorage
export const authenticate = (data,next)=>{     // takes two argument one is data and another one is call back argument
    setCookie('token',data.token);
    setLocalStorage('user',data.user);
    next();
}

// if user is authenticated 
export const isAuthenticated =()=>{
    if(process.browser){
        const checkingCookie = getCookie('token')
        if (checkingCookie){
            if(localStorage.getItem('user')){
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false;
            }
        }
    }
}
