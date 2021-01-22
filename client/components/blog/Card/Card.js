import Head from 'next/head';
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../../config';
import LabelIcon from '@material-ui/icons/Label';
import CategoryIcon from '@material-ui/icons/Category';

const Card =({blog})=>{

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
    <div className="lead pb-4">
    <header>
        <Link href={`/blogs/${blog.slug}`}>
            <a><h3 className="display-5 pt-3 pb-4 font-weight-bold">{blog.title}</h3></a>
        </Link>
    </header>
        <section>
          <CategoryIcon style={{color:"limegreen"}}/>[{listAndDisplayAllCategories(blog)}]<LabelIcon style={{color:"teal"}}/>[{listAndDisplayAllTaglists(blog)}]
        </section>
        <div className="row">
            <div className="col-md-4">Image-Background</div>
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
        <p className="ml-2 pt-5 pb-1">
            <div style={{backgroundColor:"inset 0 0 2000px rgba(255, 255, 255, .5)",filter:"blur(0.7px)",fontSize:"15px"}}> Author : {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()} </div>
        </p>
    </section>
</div>
    )};

export default Card;