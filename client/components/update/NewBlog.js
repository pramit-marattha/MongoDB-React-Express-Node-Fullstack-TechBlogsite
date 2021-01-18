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

    const getBlogFromLocalStorage =()=>{
        if (typeof window === "undefined"){
            return false;
        }

        if(localStorage.getItem("blog")){
            return JSON.parse(localStorage.getItem("blog"))
        } else
        return false;
    };

    const [body,setBody] = useState(getBlogFromLocalStorage())
    const [infos,setInfos] = useState({
        error:"",
        sizeError:"",
        success:"",
        formData:"",
        title:"",
        hidePublishButton:false
    });

    const {error,sizeError,success,formData,title,hidePublishButton} = infos

    useEffect(()=>{
        setInfos({...infos, formData: new FormData()})
    },[router])

    const publishTheBlog = (event)=>{
        event.preventDefault();
    }

    const handleChange=(name)=>event=>{
        // console.log(event.target.value);
        const info = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name,info)
        setInfos({...infos,[name]:info, formData,error:''})

    };

    const handleBody =(event)=>{
        // console.log(event)
        setBody(event)
        formData.set("body",event)
        if(typeof window !== "undefined"){
            localStorage.setItem("blog",JSON.stringify(event))
        }
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
            <ReactQuill modules={NewBlog.modules} formats={NewBlog.formats} style={{"backgroundColor":"white","color":"black"}} value={body} placeholder="Sketch your blog..." onChange={handleBody}/>
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

NewBlog.modules = {
    toolbar: [
        [{ header: [1,2,3,4,5,6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image', 'video'],
        ['clean'],
        ['code-block']
    ]
};

NewBlog.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'video',
    'code-block'
];


export default withRouter(NewBlog);