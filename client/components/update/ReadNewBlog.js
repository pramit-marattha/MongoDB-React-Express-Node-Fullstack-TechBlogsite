import Link from "next/link";
import React,{useState,useEffect} from "react";
import Router from "next/router";
// importing actions
import {getCookie,isAuthenticated} from "../../actions/authentication";
import {listingTheBlog,removingTheBlog,updatingTheBlog} from "../../actions/blog";
import PublishIcon from '@material-ui/icons/Publish';
import {ReactQuillModules,ReactQuillFormats} from "../../helpers/ReactQuill";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import moment from "moment";
import CreateIcon from '@material-ui/icons/Create';

const ReadNewBlog = () => {
    const [blogs,setBlogs] = useState([])
    const [message,setMessage] = useState('')
    const token = getCookie('token')

    const loadBlogs = ()=>{
        listingTheBlog().then(data=>{
            if(data.error){
                console.log(data.error)
            } else{
                setBlogs(data)
            }
        })
    }
    useEffect(()=>{
        loadBlogs();
    },[])

    const deleteTheBlog =(slug)=>{
        removingTheBlog(slug,token).then(data=>{
            if(data.error){
                console.log(data.error)
            } else{
                setMessage(data.message)
                loadBlogs();
            }
        })
    }

    const deleteConfirmation =()=>{
        let answer = window.confirm("Are you sure you want to delete this ?")
        if (answer){
            deleteTheBlog(slug)
        }
    };

    const showEditButton= blog =>{
        if (isAuthenticated() && isAuthenticated().role === 0){
            return (
                <Link href={`/userDashboard/update/${blog.slug}`}>
                    <a className="ml-3 btn btn-sm btn-warning"><CreateIcon/> Edit</a>
                </Link>
            );
        } else if (isAuthenticated() && isAuthenticated().role === 1){
            return (
                <Link href={`/adminDashboard/update/${blog.slug}`}>
                    <a className="ml-3 btn btn-sm btn-warning"><CreateIcon/> Edit</a>
                </Link>
            )
        }
    };

    const showingAllBlogs=()=>{
        return blogs.map((blog,index)=>{
            return (
                <div key={index} className="mt-4 pb-5">
                    <h3>{blog.title}</h3>
            <div style={{backgroundColor:"inset 0 0 2000px rgba(255, 255, 255, .5)",filter:"blur(0.7px)",fontSize:"15px"}}> Author : {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()} </div>
               <button className="btn btn-sm btn-danger" onClick={() => deleteConfirmation(blog.slug)}><DeleteForeverIcon/> Delete</button>
               {showEditButton(blog)}
               {/* {console.log("role",isAuthenticated().role)} */}
                </div>
            )
        })
    }

    return (
        <>
        <div className="container">
            <div className="row">
            <div className="col-md-12">
                {message && <div className="alert alert-warning">{message}</div>}
                {showingAllBlogs()}
                </div>
            </div>
        </div>
        </>
    )
};

export default ReadNewBlog;
