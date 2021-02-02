import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from "next/router";
import Layout from '../../components/Layout';
import { userPublicProfile } from '../../actions/user';
import LabelIcon from '@material-ui/icons/Label';
import CategoryIcon from '@material-ui/icons/Category';
import {API,DOMAIN,APP_NAME} from '../../config';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import React from 'react';

const UserProfile = () => {
    return (
        <>
            <Layout>
            <div className="container">
            <div className="row">
            <div className="col-md-12">
            <div className="card">
            <div className="card-body">
            <h5>username</h5>
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

export default UserProfile;
