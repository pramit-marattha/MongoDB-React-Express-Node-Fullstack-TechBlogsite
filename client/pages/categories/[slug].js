import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from "next/router";
import Layout from '../../components/Layout';
import { getSingleCategory } from '../../actions/category';
import LabelIcon from '@material-ui/icons/Label';
import CategoryIcon from '@material-ui/icons/Category';
import {API,DOMAIN,APP_NAME} from '../../config';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import renderHTML from 'react-render-html';
import Card from "../../components/blog/Card";



const Category = ({category,blogs})=>{
    return (
        <>
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold">{category.name}</h1>
                                {/* {JSON.stringify(blogs)} */}
                                {blogs.map((blogg,index)=>{
                                    return (
                                        <div className="mt-3 pb-2">
                                        <Card key={index} blog={blogg} />
                                        </div>
                                    )
                                })}
                            </div>
                        </header>

                    </div>
                </main>
            </Layout>
        </>
    )
};

Category.getInitialProps = ({query}) =>{
    return getSingleCategory(query.slug).then(data=>{
        if(data.error){
            console.log(data.error)
        } else {
            return {category: data.category, blogs:data.blogs}
        }
    })
};

export default Category;