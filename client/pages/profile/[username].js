import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from "next/router";
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import LabelIcon from '@material-ui/icons/Label';
import CategoryIcon from '@material-ui/icons/Category';
import {API,DOMAIN,APP_NAME} from '../../config';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment'; //moment js to record date
import React from 'react';

const UserProfile = ({user,blogs}) => {
    return (
        <>
            <Layout>
            <div className="container mt-5">
            <div className="row">
            <div className="col-md-12">
            <div className="card">
            <div className="card-body">
            <h5 style={{color:"black"}}> {user.name}</h5>
            <p>userinformation</p>
            </div>
            </div>
            </div>
            </div>
            </div>
            </Layout>
        </>
    )
}

UserProfile.getInitialProps = ({query})=>{

    return userPublicProfile(query.username).then(data=>{
        if(data.error){
            console.log(data.error)
        } else {
            return {user: data.user, blogs: data.blogs}
        }
    })

}

export default UserProfile;
