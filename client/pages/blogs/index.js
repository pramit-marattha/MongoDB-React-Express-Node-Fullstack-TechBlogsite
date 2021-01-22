import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import React,{ useState,useEffect } from 'react';
import { listBlogsWithCategoriesAndTaglists } from '../../actions/blog';
import { API } from '../../config';
import Card from "../../components/blog/Card";


const Blogs = ({blogs,categories,taglists,size}) => {
    const listAndDisplayAllBlogs = ()=>{
        return blogs.map((blog,index)=>(
            <article key={index}>
                <Card blog={blog}/>
                <hr style={{backgroundColor:"white",height:"2px",width:"100%"}}/>
            </article>
        ))
    }

    return (
        <>
        <Layout>
            <main>
                <div className="container-fluid">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold text-center">Tech Blogs</h1>
                        </div>
                        <section>
                            <p>show categories and tags</p>
                        </section>
                    </header>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">{listAndDisplayAllBlogs()}</div>
                    </div>
                </div>
            </main>
        </Layout>
        </>
    );
};

// lifecycle methods that comes with next js 
// getInitialProps
// getInitialProps can only be used on the pages not on the components

Blogs.getInitialProps =()=>{
    return listBlogsWithCategoriesAndTaglists().then(data =>{
        if(data.error){
            console.log(data.error)
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                taglists: data.taglists,
                size: data.size
            };
        }
    })
};


export default Blogs; 