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


const NewBlog = ({ router }) => {
    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return false;
        }

        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    };

    const [categories, setCategories] = useState([]);
    const [taglists, setTaglists] = useState([]);

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // taglists

    const [body, setBody] = useState(blogFromLS());
    const [infos, setInfos] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    });

    const { error, sizeError, success, formData, title, hidePublishButton } = infos;

    useEffect(() => {
        setInfos({ ...infos, formData: new FormData() });
        initializeCategories();
        initializeTaglists();
    }, [router]);

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

    const publishBlog = e => {
        e.preventDefault();
        console.log('ready to publishBlog');
    };

    const handleChange = name => e => {
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setInfos({ ...infos, [name]: value, formData, error: '' });
    };

    const handleBody = e => {
        // console.log(e);
        setBody(e);
        formData.set('body', e);
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e));
        }
    };

    const handleToggle = cat => () => {
        setInfos({ ...infos, error: '' });
        // return the first index or -1
        const clickedCategory = checked.indexOf(c);
        const all = [...checked];

        if (clickedCategory === -1) {
            all.push(c);
        } else {
            all.splice(clickedCategory, 1);
        }
        console.log(all);
        setChecked(all);
        formData.set('categories', all);
    };

    const displayCategories = () => {
        return (
            categories &&
            categories.map((cat, index) => (
                <li key={index} className="list-unstyled">
                    <input onChange={handleToggle(cat._id)} type="checkbox" className="mr-2" />
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
                    <input type="checkbox" className="mr-2" />
                    <label className="form-check-label">{tagg.name}</label>
                </li>
            ))
        );
    };

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} placeholder="Please enter a title" />
                </div>

                <div className="form-group">
                    <ReactQuill
                        placeholder="Write your blog ♥"
                        style={{backgroundColor:"white",color:"black"}}
                        modules={NewBlog.modules}
                        formats={NewBlog.formats}
                        value={body}
                        onChange={handleBody}
                    />
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-info pt-3 pb-3 pl-3 pr-3">
                        Publish it
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="container-fluid">
            <div className="row">
               

                <div className="col-md-4">
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
                    {createBlogForm()}
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
};

NewBlog.modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' },{ 'align': [] }],
        ['link', 'image', 'video'],
        [{ 'color': [] }, { 'background': [] }], 
        ['clean'],
        ['code-block']
    ]
};

NewBlog.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "align",
    "strike",
    "script",
    "blockquote",
    "background",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "code-block"
];

export default withRouter(NewBlog);