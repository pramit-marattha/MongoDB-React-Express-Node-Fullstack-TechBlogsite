import React ,{useState,useEffect} from "react";
import Router from "next/router";
import {isAuthenticated} from "../../actions/authentication";

const PrivateRoute = ({children})=>{


    useEffect(()=>{
        if(!isAuthenticated()){
            Router.push(`/login`)
        }
    },[])

    return (
        <>
        {children}
        </>
    )

}

export default PrivateRoute;