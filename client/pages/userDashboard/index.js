import Layout from "../../components/Layout";
import PrivateRoute from "../../components/authentication/PrivateRoute";
import Link from "next/link";


const UserIndex =() =>{
    return(
        <Layout>
        <PrivateRoute>
        <h2>User Dashboard</h2>
        </PrivateRoute>
        </Layout>
    )
}

export default UserIndex;