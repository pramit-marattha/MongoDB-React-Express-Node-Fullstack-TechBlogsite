import Link from "next/link";
import React,{useState,useEffect} from "react";
import Router from "next/router";
import dynamic from "next/dynamic";  // react quill runs on client side so dynamic is used to turn off ssr for react quill(to dynamically load the component)
import {withRouter} from "next/router"; // to get access to the router props from the components
// importing actions
import {getCookie,isAuthenticated} from "../../actions/authentication";
import {getCategories} from "../../actions/category"; 
import {getTagLists} from "../../actions/tag"; 
import {createBlog} from "../../actions/blog";

// dynamically importing react quill
const ReactQuill = dynamic(() => import("react-quill"),{ssr:false});  


const NewBlog = ({router})=>{
    return (
        <div>
        Create Blog Form
        {JSON.stringify(router)}
        </div>
    )
};

export default withRouter(NewBlog);