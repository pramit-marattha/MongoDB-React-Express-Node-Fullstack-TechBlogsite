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

    const [body,setBody] = useState({})
    const [infos,setInfos] = useState({
        error:"",
        sizeError:"",
        success:"",
        formData:"",
        title:"",
        hidePublishButton:false
    });

    const {error,sizeError,success,formData,title,hidePublishButton} = infos

    const publishTheBlog = (event)=>{
        event.preventDefault();
    }

    const handleChange=(name)=>event=>{
        console.log(event.target.value);
    };

    const handleBody =(event)=>{
        console.log(event)
    };

    ////////////////////



    /////////////////////////
    
    const createBlogForm =()=>{
        return (
            <form onSubmit={publishTheBlog}>
            <div className="form-group" >
            <label className="text-muted">
            Title
            </label>
            <input type="text" className="form-control" value={title} onChange={handleChange("title")}/>
            </div>
            <div className="form-group">
            <ReactQuill style={{"background-color":"white","color":"black"}} value={body} placeholder="Sketch your blog..." onChange={handleBody}/>
            </div>
            <div>
            <button type="submit" className="btn btn-info">
            publish
            </button>
            </div>
            </form>
        )
    }

    return (
        <>
        <div>
        {createBlogForm()}
        </div>
        </>
    )
};

export default withRouter(NewBlog);