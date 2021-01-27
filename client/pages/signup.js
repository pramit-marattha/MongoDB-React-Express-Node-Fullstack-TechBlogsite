import React from "react";
import Layout from "../components/Layout";  
import Register from "../components/authentication/Register";
import Link from "next/link";

const Signup =() =>{
    return(
        <Layout>
        <h3 className="text-center pt-3 pb-5">Register New Account</h3>
        <div className="row">
        <div className="col-md-4 offset-md-4">
        <Register/>
        </div>
        </div>
        </Layout>
    )
}

export default Signup;