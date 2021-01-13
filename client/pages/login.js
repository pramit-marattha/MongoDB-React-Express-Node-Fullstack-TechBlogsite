import Layout from "../components/Layout";
import Link from "next/link";


const Login =() =>{
    return(
        <Layout>
        <Link href="/"><a>Home</a></Link>
        <br/>
        <h2>Login page</h2>
        </Layout>
    )
}

export default Login;