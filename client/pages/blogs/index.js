import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import React,{ useState } from 'react';
import renderHTML from 'react-render-html';
import { listBlogsWithCategoriesAndTaglists } from '../../actions/blog';
import { API } from '../../config';
import moment from 'moment';

const Blogs = ({blogs,categories,taglists,size}) => {
    const listAndDisplayAllBlogs = ()=>{
        return blogs.map((blog,index)=>(
            <article key={index}>
                <div className="lead pb-4">
                    <header>
                        <Link href={`/blogs/${blog.slug}`}>
                            <a><h3 className="display-5 pt-3 pb-4 font-weight-bold">{blog.title}</h3></a>
                        </Link>
                    </header>
                    
                    <section>
                            <p>blog cat .. and taglist</p>
                        </section>

                        <div className="row">
                            <div className="col-md-4">Image Background</div>
                            <div className="col-md-8">
                                <section>
                                    <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                                    <Link href={`/blogs/${blog.slug}`}>
                                        <a className="btn btn-info  pt-2">Read more</a>
                                    </Link>
                                </section>
                            </div>
                        </div>
                        <section>
                        <p className="ml-2 pt-4 pb-2">
                            <div style={{backgroundColor:"inset 0 0 2000px rgba(255, 255, 255, .5)",filter:"blur(0.7px)",fontSize:"15px"}}> Author : {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()} </div>
                        </p>
                    </section>
                </div>
                <hr style={{backgroundColor:"white"}}/>
            </article>
        ))
    }

    return (
        <Layout>
            <main>
                <div className="container-fluid">
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold text-center">Tech Related Blogs</h1>
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