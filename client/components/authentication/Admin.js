import React ,{useState,useEffect} from "react";
import Router from "next/router";
import {isAuthenticated} from "../../actions/authentication";

const Admin = ({children})=>{


    useEffect(()=>{
        if(!isAuthenticated()){
            Router.push(`/login`);
        }else if (isAuthenticated().role !== 1){
            Router.push(`/`);
        }
    },[])

    return (
        <>
        {children}
        </>
    )

}

export default Admin;