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
import PublishIcon from '@material-ui/icons/Publish';
import {ReactQuillModules,ReactQuillFormats} from "../../helpers/ReactQuill";


const UpdateNewBlog = () =>{
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                <div >
                    <div className="form-group pb-2">
                        <h4>Featured Background Image</h4>
                        <hr style={{backgroundColor:"white"}}/>
                        <small className="text-muted">Maximum file size : 1024kb </small>
                        <label className="btn btn-outline-success">Upload Image
                        <input type="file" accept="image/*" hidden/>
                        {/* <img src={handleChange(setInfos([name]))}/> */} 
                        </label>
                    </div>
                </div>
                    <div>
                        <h5>Select Categories</h5>
                        <hr style={{backgroundColor:"white"}}/>
                        <ul style={{ maxHeight: '170px', overflowY: 'scroll' }}>display categories</ul>
                    </div>
                    <div>
                    <hr style={{backgroundColor:"white"}}/>
                        <h5>Select Tags</h5>
                        <hr style={{backgroundColor:"white"}}/>
                        <ul style={{ maxHeight: '170px', overflowY: 'scroll' }}>display taglists</ul>
                        
                    </div>
                </div>
                <div className="col-md-8">
                    Create Blog Form
                    <p>Show Sucess and error Message</p>
                    {/* {displayError()}
                    {displaySuccess()}
                    {createBlogForm()} */}
                    {/* <hr />
                    {JSON.stringify(title)}
                    <hr />
                    {JSON.stringify(body)}
                    <hr />
                    {JSON.stringify(categories)}
                    <hr />
                    {JSON.stringify(taglists)} */}
                </div>
            </div>
        </div>
    );
}
export default UpdateNewBlog;