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
        <ul className="list-group">
        {/* // new category  */}
                <li className="list-group-item">
                  <Link href="/adminDashboard/update/category-tag">
                      <a>Create new category</a>
                  </Link>
             </li>

        {/* // new tag  */}
             <li className="list-group-item">
                  <Link href="/adminDashboard/update/category-tag">
                      <a>Create new tag</a>
                  </Link>
             </li>

        {/* // new blog */}
              <li className="list-group-item">
                  <Link href="/adminDashboard/update/blog">
                      <a>Create new blog</a>
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