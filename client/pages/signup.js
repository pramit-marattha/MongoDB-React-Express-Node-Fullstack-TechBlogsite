import React from "react";
import Layout from "../components/Layout";  
import Register from "../components/authentication/Register";
import Link from "next/link";

const Signup =() =>{
    return(
        <Layout>
        <Link href="/"><a>Home</a></Link>
        <Register/>
        </Layout>
    )
}

export default Signup;