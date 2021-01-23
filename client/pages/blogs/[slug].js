import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from "next/router";
import Layout from '../../components/Layout';
import React,{ useState,useEffect } from 'react';
import { singleBlog } from '../../actions/blog';
import LabelIcon from '@material-ui/icons/Label';
import CategoryIcon from '@material-ui/icons/Category';
import {API,DOMAIN,APP_NAME} from '../../config';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const SingleBlog = ({blog,router})=>{
    return (
        <>
        <Layout>
            <main>
                <article>
                    <div className="container-fluid">
                        <section>
                            {JSON.stringify(blog)}
                        </section>
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
            return {blog:data}
        }
    })
}

export default withRouter(SingleBlog);