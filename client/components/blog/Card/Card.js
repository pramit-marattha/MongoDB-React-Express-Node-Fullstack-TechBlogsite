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
    <div className="lead pb-4" style={{boxShadow:"inset 0 0 2000px rgba(255, 255, 255, .5)",filter:"blur(0.1px)",borderRadius:"17px"}}>
    <header>
        <Link href={`/blogs/${blog.slug}`}>
            <a target="_blank"><h3 className="display-5 pt-4 pb-2 font-weight-bold pl-5">{blog.title}</h3></a>
        </Link>
    </header>
        <section>
        <CategoryIcon style={{color:"limegreen"}}/>{listAndDisplayAllCategories(blog)} <LabelIcon style={{color:"teal"}}/>{listAndDisplayAllTaglists(blog)}
        </section>
        <div className="row">
            <div className="col-md-4">
                <section>
                    <img className="img img-fluid pl-3" style={{maxHeight:"290px",width:"auto",filter:"blur(0.5px)"}} src={`${API}/api/blog/photo/${blog.slug}`} alt={blog.title}/>
                </section>
            </div>
            <div className="col-md-8">
                <section>
                    <div className="pb-3">{renderHTML(blog.excerpt)}</div>
                    <Link href={`/blogs/${blog.slug}`}><a className="btn btn-info  pt-2" target="_blank">Read more<MoreIcon/></a></Link>
                </section>
            </div>
        </div>
        <section>
        <p className="ml-2 pt-4 pb-1 pl-3">
            <div style={{backgroundColor:"inset 0 0 2000px rgba(255, 255, 255, .5)",filter:"blur(0.7px)",fontSize:"15px"}}> Author : {blog.postedBy.name} | Published {moment(blog.updatedAt).fromNow()} </div>
        </p>
    </section>
</div>
    )};

export default Card;