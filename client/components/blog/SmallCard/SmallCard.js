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

const SmallCard =({blog})=>{

        console.log(blog);

    return (
        <>
        <div style={{backgroundColor:"grey"}} className="card singleblog-foreground">
            <section>
                <Link href={`/blogs/${blog.slug}`} >
                    <a>
                    <img className="img img-fluid" style={{maxHeight:"290px",width:"auto",filter:"blur(0.5px)"}} src={`${API}/api/blog/photo/${blog.slug}`} alt={blog.title}/>
                    </a>
                </Link>
            </section>
            
            <div className="card-body">
                <section>
                <Link href={`/blogs/${blog.slug}`} >
                        <a><h4>{blog.title}</h4></a>
                    </Link>
                    <p className="card-text">{renderHTML(blog.excerpt)}</p>
                </section>
            </div>

            <div className="card-body">
            <Link href={`/blogs/${blog.slug}`}><a className="btn btn-info" target="_blank">Read more <MoreIcon/></a></Link>
            <div className="pt-3">
            <div style={{backgroundColor:"inset 0 0 2000px rgba(255, 255, 255, .5)",filter:"blur(0.7px)",fontSize:"15px"}}>Published:{moment(blog.updatedAt).fromNow()} by:  
            <Link href={`/`}>
                <a className="float-right">
                {blog.postedBy.name}
                </a>
            </Link>
            </div>
            </div>
            </div>
        </div>
</>
    )};

export default SmallCard;