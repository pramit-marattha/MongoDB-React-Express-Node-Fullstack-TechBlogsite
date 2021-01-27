import React from "react";
import Layout from "../components/Layout";  
import LoginAuth from "../components/authentication/LoginAuth";
import Link from "next/link";

const Login =() =>{
    return(
      <Layout>
        <h3 className="text-center pt-3 pb-5">Login</h3>
        <div className="row">
        <div className="col-md-4 offset-md-4">
        <LoginAuth/>
        </div>
        </div>
        </Layout>
    )
}

export default Login;