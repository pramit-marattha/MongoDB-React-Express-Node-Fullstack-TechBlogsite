import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from "next/router";
import Layout from '../../components/Layout';
import React,{ useState,useEffect } from 'react';
import { singleBlog,blogListRelated } from '../../actions/blog';
import LabelIcon from '@material-ui/icons/Label';
import CategoryIcon from '@material-ui/icons/Category';
import {API,DOMAIN,APP_NAME} from '../../config';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import renderHTML from 'react-render-html';
import SmallCard from "../../components/blog/SmallCard";





const SingleBlog = ({blog,query})=>{

    const [showBlogRelated,setShowBlogRelated] = useState([]);

    const loadBlogRelated = ()=>{
        blogListRelated({blog}).then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                setShowBlogRelated(data);
            }
        })
    };

    const showingRelatedBlogs = ()=>{
        return showBlogRelated.map((blog,index)=>{
            return (
                <div className="col-md-4" key={index}>
                    <article>
                        <SmallCard blog={blog}/>
                    </article>
                </div>
            )
        })
    }

    useEffect(()=>{
        loadBlogRelated();
    },[])


    const head = ()=>{
        <Head>
            <title>{blog.title} | {APP_NAME}</title>
            <meta name="description" content={blog.mdesc}/>
            <Link rel="cannonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`}/>
            <meta name="og:description" content={blog.mdesc}/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`}/>    
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={`${API}/api/blog/photo/${blog.slug}`}/>
            <meta property="og:image:secure_url" content={`${API}/api/blog/photo/${blog.slug}`}/>
            <meta property="og:image:type" content="image/jpg"/>
            {/* <meta property="og:site_name" content={`${APP_NAME}`}/> */}
        </Head>
    }

    const listAndDisplayAllCategories = blog => {
        return (
            blog.categories.map((cat,index)=>{
            return (
                <Link key={index} href={`/categories/${cat.slug}`}>
                    <a className="btn btn-sm btn-outline-success mr-1 ml-1 mt-3 mb-4">{cat.name}</a>
                </Link>
            )
        })
        )
    }; 
    
    const listAndDisplayAllTaglists = blog => {
        return (
            blog.taglists.map((tagg,index)=>{
            return (
                <Link key={index} href={`/taglists/${tagg.slug}`}>
                    <a className="btn btn-sm btn-outline-info mr-1 ml-1 mt-3 mb-4">{tagg.name}</a>
                </Link>
            )
        })
        )
    }; 

    return (
        <>
        {head()}
        <Layout>
            <main className="singleblog-background">
                <article className="singleblog-foreground">
                    <div className="container-fluid">
                        <section>
                        <div className="row" style={{marginTop:"0px"}}>
                            <img src={`${API}/api/blog/photo/${blog.slug}`} alt={blog.title} className="img img-fluid background-image"/>
                        </div>
                        </section>
                        <section>
                            <p className="lead pb-1 pt-1">
                             <div style={{backgroundColor:"inset 0 0 2000px rgba(255, 255, 255, .5)",filter:"blur(0.7px)",fontSize:"15px"}}> Author : {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()} </div>
                            </p>
                            <div className="pb-3">
                              <CategoryIcon style={{color:"limegreen"}}/>{listAndDisplayAllCategories(blog)}<LabelIcon style={{color:"teal"}}/>{listAndDisplayAllTaglists(blog)}
                            </div>
                        </section>
                        <section>
                        <div className="text-center">
                            <h3 className="pt-4 pb-3" style={{backgroundColor:"inset 0 0 2000px rgba(255, 255, 255, 1)",filter:"blur(0.5px)",color:"#ff4500",fontSize:"40px",fontWeight:"bold"}}>{blog.title}</h3>
                            </div>
                        </section>
                    </div>
                    <div className="container">
                    <section>
                    <div className="col-md-12 lead" style={{textAlign:"justify"}}>{renderHTML(blog.body)}</div>
                    </section>
                    </div>

                    {/* // Related blogs */}
                    <div className="container pb-5">
                        <h4 className="text-center pb-5 pt-5 h2">Related Blogs</h4>
                        <hr/>
                        {/* <p>Show Related Blogs</p> */}
                        {/* {JSON.stringify(showBlogRelated)} */}
                        <div className="row">
                        {showingRelatedBlogs()}
                        </div>
                    </div>

                        {/* Disqus commneting  */}
                    <div className="container pb-5">
                        <hr/>
                        <p>Disqus Comments</p>
                    </div>
                </article>
            </main>
        </Layout>
        </>
    )
}

SingleBlog.getInitialProps=({query})=>{
    return singleBlog(query.slug).then(data=>{
        if (data.error){
            console.log(data.error)
        } else {
            return {blog:data,query}
        }
    })
}

export default withRouter(SingleBlog);