import Link from "next/link";
import React,{useState,useEffect} from "react";
import Router from "next/router";
// importing actions
import {getCookie,isAuthenticated} from "../../actions/authentication";
import {listingTheBlog,removingTheBlog,updatingTheBlog} from "../../actions/blog";
import PublishIcon from '@material-ui/icons/Publish';
import {ReactQuillModules,ReactQuillFormats} from "../../helpers/ReactQuill";

const ReadNewBlog = () => {
    return (
        <>
            <p>Update Blogs</p>
        </>
    )
}

export default ReadNewBlog;
