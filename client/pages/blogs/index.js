import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from "next/router";
import Layout from '../../components/Layout';
import React,{ useState,useEffect } from 'react';
import { listBlogsWithCategoriesAndTaglists } from '../../actions/blog';
import Card from "../../components/blog/Card";
import LabelIcon from '@material-ui/icons/Label';
import CategoryIcon from '@material-ui/icons/Category';
import {API,DOMAIN,APP_NAME} from '../../config';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Search from "../../components/blog/Search";


const Blogs = ({blogs,categories,taglists,totalBlogs,blogsLimit,blogSkip,router}) => {
    const head = ()=>{
        <Head>
            <title>Tech Blogs | {APP_NAME}</title>
            <meta name="description" content="Tutorials and detail information about most recent tech news"/>
            <Link rel="cannonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest News about tech and various tutorials on various technology | ${APP_NAME}`}/>
            <meta name="og:description" content="Tutorials and detail information about most recent tech news"/>
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>    
            <meta property="og:site_name" content={`${APP_NAME}`}/>
            <meta property="og:image" content={`${DOMAIN}/static/assets/27263.jpg`}/>
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/assets/27263.jpg`}/>
            <meta property="og:image:type" content="image/jpg"/>
            {/* <meta property="og:site_name" content={`${APP_NAME}`}/> */}
        </Head>
    }

    const [skip,setSkip] = useState(0);
    const [limit,setLimit] = useState(blogsLimit);
    const [size,setSize] = useState(totalBlogs);
    const [loadedBlogs,setLoadedBlogs] = useState([]);

    const loadMoreBlogs = ()=>{
        let toSkip = skip + limit
        listBlogsWithCategoriesAndTaglists(toSkip, limit).then(data =>{
            if(data.error){
                console.log(data.error)
            } else {
                setLoadedBlogs([...loadedBlogs,...data.blogs])
                setSize(data.size)
                setSkip(toSkip)
            }
        })
    };

    const loadMoreBlogButton =()=>{
        return (
            size > 0 && size >= limit && (<button onClick={loadMoreBlogs} className="btn btn-info">Load More <ExpandMoreIcon/> </button>)
        )
    };
    
    const showingAllLoadedBlogs = ()=>{
        return loadedBlogs.map((blog,index)=>{
            return (
                <article key={index}>
                    <Card blog={blog}/>
                <hr style={{backgroundColor:"white",height:"2px",width:"100%",filter:"blur(3px)"}}/>
                </article>
            )
        })
    };

    const listAndDisplayAllBlogs = ()=>{
        return blogs.map((blog,index)=>(
            <article key={index}>
                <Card blog={blog}/>
                <hr style={{backgroundColor:"white",height:"2px",width:"100%",filter:"blur(3px)"}}/>
            </article>
        ))
    };

    const listAndDisplayAllTheCategories =() =>{
        return categories.map((cat,index)=>{
                return (
                <Link href={`/categories/${cat.slug}`} key={index}>
                <a className="btn btn-sm btn-success mr-1 ml-1 mt-3">{cat.name}</a>
                </Link>
                )
        })
    };

    const listAndDisplayAllTheTaglists =() =>{
        return taglists.map((tagg,index)=>{
                return (
                    <Link key={index} href={`/taglists/${tagg.slug}`}>
                    <a className="btn btn-sm btn-info mr-1 ml-1 mt-3 mb-4">{tagg.name}</a>
                </Link>
                )
        })
    };

    return (
        <>
        {head()}
        <Layout>
            <main className="blog-foreground">
                <div className="container-fluid">
                     <Search/>
                    <header>
                        <div className="col-md-12 pt-3">
                            <h1 className="display-4 font-weight-bold text-center">Tech Blogs</h1>
                        </div>
                        <section>
                            <div className="pb-5 text-center">
                            <CategoryIcon style={{color:"limegreen"}}/>{listAndDisplayAllTheCategories()}
                                <br/>
                                <LabelIcon style={{color:"teal"}}/>{listAndDisplayAllTheTaglists()} 
                            </div>
                        </section>
                    </header>

                </div>
                <div className="container-fluid">{listAndDisplayAllBlogs()}</div>
                <div className="container-fluid">{showingAllLoadedBlogs()}</div>
                <div className="text-center pt-3 pb-5">{loadMoreBlogButton()}</div>
            </main>

        </Layout>   
        </>
    );
};

// lifecycle methods that comes with next js 
// getInitialProps
// getInitialProps can only be used on the pages not on the components

Blogs.getInitialProps =()=>{
    let skip = 0
    let limit = 3
    return listBlogsWithCategoriesAndTaglists(skip,limit).then(data =>{
        if(data.error){
            console.log(data.error)
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                taglists: data.taglists,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip 
            };
        }
    })
};

export default withRouter(Blogs); 