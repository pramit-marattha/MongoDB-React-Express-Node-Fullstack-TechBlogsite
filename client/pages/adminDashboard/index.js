import Layout from "../../components/Layout";
import Admin from "../../components/authentication/Admin";
import Link from "next/link";


const AdminIndex =() =>{
    return(
        <Layout>
        <Admin>
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-12">
        <h2>Admin Dashboard</h2>
        </div>
        <div className="col-md-4 pt-5 pb-5">
        <ul class="list-group">
                <li className="list-group-item">
                  <Link href="/adminDashboard/update/category-tag">
                      <a>Create new category</a>
                  </Link>
             </li>
                </ul>
        </div>
        <div className="col-md-8 pt-5 pb-5">
            Right
        </div>
        </div>
        </div>
        </Admin>
        </Layout>
    )
}

export default AdminIndex;