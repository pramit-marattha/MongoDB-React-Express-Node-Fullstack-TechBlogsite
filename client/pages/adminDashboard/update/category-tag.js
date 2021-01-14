import Layout from "../../../components/Layout";
import Admin from "../../../components/authentication/Admin";
import Link from "next/link";


const CategoryTag =() =>{
    return(
        <Layout>
        <Admin>
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-12">
        <h2>Create Catagories and Tags</h2>
        </div>
        <div className="col-md-6 pt-5 pb-5">
        <a>Categories</a>
        </div>
        <div className="col-md-6 pt-5 pb-5">
            <a>Tags</a>
        </div>
        </div>
        </div>
        </Admin>
        </Layout>
    )
}

export default CategoryTag;