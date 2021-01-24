import Layout from "../../components/Layout";
import Admin from "../../components/authentication/Admin";
import Link from "next/link";
import LabelIcon from '@material-ui/icons/Label';
import CategoryIcon from '@material-ui/icons/Category';
import BookIcon from '@material-ui/icons/Book';




const AdminIndex =() =>{
    return(
        <Layout>
        <Admin>
        <div className="container-fluid">
        <div className="row">
        <div className="col-md-12">
        <h2 className="text-center pt-4 display-4">Admin Dashboard</h2>
        </div>
        <div className="row">
        {/* <ul className="list-group"> */}
        {/* // new category  */}
                {/* <li className="list-group-item"> */}
                <div className="pt-5 pl-5 pb-5">
                  <Link href="/adminDashboard/update/category-tag">
                      <button className="pt-5 pb-5 pl-5 pr-5 btn btn-success"><div className="h4">Create new category <CategoryIcon/></div></button>
                  </Link>
                  </div>
             {/* </li> */}

        {/* // new tag  */}
             {/* <li className="list-group-item"> */}
             <div className="pt-5 pl-5 pb-5">
                  <Link href="/adminDashboard/update/category-tag">
                      <button className="pt-5 pb-5 pl-5 pr-5 btn btn-info"><div className="h4">Create new tag <LabelIcon/></div></button>
                  </Link>
                  </div>
             {/* </li> */}

        {/* // new blog */}
              {/* <li className="list-group-item"> */}
              <div className="pt-5 pl-5 pb-5">
                  <Link href="/adminDashboard/update/blog">
                      <button className="pt-5 pb-5 pl-5 pr-5 btn btn-warning"><div className="h4">Create new blog <BookIcon/></div></button>
                  </Link>
                  </div>
             {/* </li> */}
                {/* </ul> */}

                <div className="pt-5 pl-5 pb-5">
                  <Link href="/adminDashboard/update/editBlog">
                      <button className="pt-5 pb-5 pl-5 pr-5 btn btn-success"><div className="h4">Update blogs <BookIcon/></div></button>
                  </Link>
                  </div>
        </div>
        {/* <div className="col-md-8 pt-5 pb-5">
            Right
        </div> */}
        </div>
        </div>
        </Admin>
        </Layout>
    )
}

export default AdminIndex;