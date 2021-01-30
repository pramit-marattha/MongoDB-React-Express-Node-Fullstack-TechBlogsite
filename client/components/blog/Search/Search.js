import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../../config';
import LabelIcon from '@material-ui/icons/Label';
import CategoryIcon from '@material-ui/icons/Category';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoreIcon from '@material-ui/icons/More';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {listSearchBlogItems} from "../../../actions/blog"

const Search = () => {
    const [infos,setInfos] = useState({
        search: undefined,
        results:[],
        searched:false  ,
        message:''
    }) 
    const {search,results,searched,message} = infos 

    const searchSubmit = event=>{
        event.preventDefault();
        listSearchBlogItems({search}).then(data=>{
            setInfos({...infos,results:data,searched:true,message:`Total ${data.length} blogs found`})
        })
    };

    const handleChange = event =>{
        // event.preventDefault();
        setInfos({...infos,search: event.target.value,searched:false,results:[]})
    };

    const searchedBloglists =(results)=>{
         return (
             <div className="jumbotron bg-white">
             {message && <p className="pt-4 text-muted">{message}</p>}
              {results.map((blog,index)=>(
                  <div key={index}>
                    <Link href={`/blogs/${blog.slug}`}>
                        <a className="text-info" target="_blank">{blog.title}</a>
                    </Link>
                  </div>
              ))}
             </div>
         )
    }

    const searchForm = ()=>{
        return (
            <form onSubmit={searchSubmit}>
            <div className="row">
            <div className="col-md-8">
                <input type="search" className="form-control" placeholder="Search" onChange={handleChange}/>
            </div>
            <div className="col-md-4">
            <button className="btn btn-block btn-info" type="submit">Search</button>
            </div>
            </div>
            </form>
        )
    };


    return (
        <div className="container-fluid">
            <div className="pt-3 pb-5">
                {searchForm()}
            </div>
            {searched && <div style={{marginTop:"-120px",marginBottom:"-80px"}}>{searchedBloglists(results)}</div>}
        </div>
    )
}

export default Search;
