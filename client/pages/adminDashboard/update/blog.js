import Layout from "../../../components/Layout";
import Admin from "../../../components/authentication/Admin";
import CreateNewBlog from "../../../components/update/NewBlog";

import Link from "next/link";
import CategoryIcon from '@material-ui/icons/Category';
import AddIcon from '@material-ui/icons/Add';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BookIcon from '@material-ui/icons/Book';
import PostAddIcon from '@material-ui/icons/PostAdd';
// import MenuIcon from "@material-ui/icons/Menu";
// import BigMenu from "@material-ui/icons/MenuIcons";



const Createblog =() =>{
    return(
        <Layout>
        <Admin>
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-12">
        <h1 className="text-center">
        <PostAddIcon style={{"color":"pink"}}/>
        Create a new blog
        <BookIcon style={{"color":"teal"}}/>
        </h1>
        </div>
        <div className="col-md-12">
        <CreateNewBlog/>
        </div>
        </div>
        </div>
        </Admin>
        </Layout>
    );
}

export default Createblog;