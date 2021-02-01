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
import {API} from "../../config";


// dynamically importing react quill
const ReactQuill = dynamic(() => import("react-quill"),{ssr:false}); 

const UpdateNewBlog = ({router}) =>{
    const [body,setBody] = useState('');
    const [categories, setCategories] = useState([]);
    const [taglists, setTaglists] = useState([]);

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // taglists

    const [infos, setInfos] = useState({
        title:'',
        error: '',
        success: '',
        formData: '',
        body: ''
    });

    const {title, error, success, formData } = infos;
    const token = getCookie('token');


    useEffect(()=>{
        setInfos({ ...infos, formData: new FormData() });
        initializeBlog();
        initializeCategories();
        initializeTaglists();
    },[router]);

    const handleBody = event =>{
        setBody(event)
        formData.set('body',event)
    };

    const editingTheBlog = event =>{
        event.preventDefault();    
        updatingTheBlog(formData,token,router.query.slug).then(data=>{
            if(data.error){
                setInfos({...infos,error:data.error})
            } else{
                setInfos({...infos,title:'',success:`${data.title} is successfully edited `})
                if (isAuthenticated() && isAuthenticated().role === 1){
                    Router.replace(`/adminDashboard/update/${router.query.slug}`)
                    // Router.replace(`/adminDashboard`)
                } else if (isAuthenticated() && isAuthenticated().role === 0){
                    Router.replace(`/userDashboard/update/${router.query.slug}`)
                    // Router.replace(`/userDashboard}`)
                }
            }
        })    
    };

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>
            {success}
        </div>
    );
    
    const initializeBlog =()=>{
        if(router.query.slug){
            singleBlog(router.query.slug).then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    setInfos({...infos,title:data.title});
                    setBody(data.body);
                    setCategoriesArray(data.categories)
                    setTaglistsArray(data.taglists)
                }
            })
        }
    };

    const setCategoriesArray=blogCategories =>{
        let catArray =[]
        blogCategories.map((cat,index)=>{
            catArray.push(cat._id)
        });
        setChecked(catArray)
    };

    const setTaglistsArray=blogTaglists =>{
        let tagArray =[]
        blogTaglists.map((tagg,index)=>{
            tagArray.push(tagg._id)
        })
        setCheckedTag(tagArray)
    };

    const handleChange = name => event => {
        // console.log(e.target.value);
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setInfos({ ...infos, [name]: value, formData, error: '' });
    };

    const initializeCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setInfos({ ...infos, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    const initializeTaglists = () => {
        getTagLists().then(data => {
            if (data.error) {
                setInfos({ ...infos, error: data.error });
            } else {
                setTaglists(data);
            }
        });
    };

    const handleCategoriesToggle = cat => () => {
        setInfos({ ...infos, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(cat);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(cat);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    const handleTaglistsToggle = tagg => () => {
        setInfos({ ...infos, error: '' });
        // return the first index or -1
        const clickedTags = checkedTag.indexOf(tagg);
        const all = [...checkedTag];

        if (clickedTags === -1) {
            all.push(tagg);
        } else {
            all.splice(clickedTags, 1);
        }
        console.log(all);
        setCheckedTag(all);
        formData.set('taglists', all);
    };

    const searchSkimCategory = cat =>{
        const result = checked.indexOf(cat) // it will return true or -1 
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const searchSkimTag= tagg =>{
        const result = checkedTag.indexOf(tagg) // it will return true or -1 
        if (result !== -1) {
            return true;
        } else {
            return false;
        }
    };

    const displayCategories = () => {
        return (
            categories &&
            categories.map((cat, index) => (
                <li key={index} className="list-unstyled">
                    <input onChange={handleCategoriesToggle(cat._id)} checked={searchSkimCategory(cat._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{cat.name}</label>
                </li>
            ))
        );
    };

    const displayTaglists = () => {
        return (
            taglists &&
            taglists.map((tagg, index) => (
                <li key={index} className="list-unstyled">
                    <input onChange={handleTaglistsToggle(tagg._id)} checked={searchSkimTag(tagg._id)} type="checkbox" className="mr-2" />
                    <label className="form-check-label">{tagg.name}</label>
                </li>
            ))
        );
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

                        {body && (
                        <img src={`${API}/api/blog/photo/${router.query.slug}`} alt={title} style={{ width: '100%' }} />
                    )}
                        <hr style={{backgroundColor:"white"}}/>
                        <small className="text-muted">Maximum file size : 1024kb </small>
                        <label className="btn btn-outline-success">Upload Image
                        <input onChange={handleChange("photo")} type="file" accept="image/*" hidden/>
                        {/* <img src={handleChange(setInfos([name]))}/> */} 
                        </label>
                    </div>
                </div>
                    <div>
                        <h5>Select Categories</h5>
                        <hr style={{backgroundColor:"white"}}/>
                        <ul style={{ maxHeight: '170px', overflowY: 'scroll' }}>{displayCategories()}</ul>
                    </div>
                    <div>
                    <hr style={{backgroundColor:"white"}}/>
                        <h5>Select Tags</h5>
                        <hr style={{backgroundColor:"white"}}/>
                        <ul style={{ maxHeight: '170px', overflowY: 'scroll' }}>{displayTaglists()}</ul>
                        
                    </div>
                </div>
                <div className="col-md-8">
                 {showSuccess()}
                    {showError()}
                    {editingTheBlogForm()}
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