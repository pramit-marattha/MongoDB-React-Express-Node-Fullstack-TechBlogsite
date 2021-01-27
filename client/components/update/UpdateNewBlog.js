import Link from "next/link";
import React,{useState,useEffect} from "react";
import Router from "next/router";
import dynamic from "next/dynamic";  // react quill runs on client side so dynamic is used to turn off ssr for react quill(to dynamically load the component)
import {withRouter} from "next/router"; // to get access to the router props from the components
// importing actions
import {getCookie,isAuthenticated} from "../../actions/authentication";
import {getCategories} from "../../actions/category"; 
import {getTagLists} from "../../actions/tag"; 
import {singleBlog,updatingTheBlog} from "../../actions/blog";
import PublishIcon from '@material-ui/icons/Publish';
import {ReactQuillModules,ReactQuillFormats} from "../../helpers/ReactQuill";


// dynamically importing react quill
const ReactQuill = dynamic(() => import("react-quill"),{ssr:false}); 

const UpdateNewBlog = ({router}) =>{
    const [body,setBody] = useState('');
    const [infos, setInfos] = useState({
        title:'',
        error: '',
        success: '',
        formData: '',
        title: '',
        body: ''
    });

    const {title, error, success, formData } = infos;


    useEffect(()=>{
        setInfos({ ...infos, formData: new FormData() });
        initializeBlog();
    },[router]);

    const handleBody = e =>{
        setBody(e)
        formData.set('body',e)
    };

    const editingTheBlog = ()=>{
        console.log('update')
    };
    
    const initializeBlog =()=>{
        if(router.query.slug){
            singleBlog(router.query.slug).then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setInfos({...infos,title:data.title});
                    setBody(data.body);
                }
            })
        }
    };

    const handleChange = name => event => {
        // console.log(e.target.value);
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setInfos({ ...infos, [name]: value, formData, error: '' });
    };


    const editingTheBlogForm = () => {
        return (
            <form onSubmit={editingTheBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} placeholder="Please enter a title" />
                </div>

                <div className="form-group">
                    <ReactQuill
                        placeholder="Write your blog ♥"
                        style={{backgroundColor:"white",color:"black"}}
                        modules={ReactQuillModules}
                        formats={ReactQuillFormats}
                        value={body}
                        onChange={handleBody}
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-info pt-3 pb-3 pl-3 pr-3">
                        Update it {" "}
                        <PublishIcon/>
                    </button>
                </div>
            </form>
        );
    };

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
                    {editingTheBlogForm()}
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
export default withRouter(UpdateNewBlog);