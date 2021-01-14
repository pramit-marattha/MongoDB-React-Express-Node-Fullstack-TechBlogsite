import React,{useState,useEffect} from 'react';
import {login,authenticate,isAuthenticated} from "../../actions/authentication.js";
import Router from "next/router";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

const LoginAuth = () => {

    const [info,setInfo] = useState({email:"",password:"",error:"",loading:false,message:"",showForm:true});

    const {email,password,error,loading,message,showForm} = info


    useEffect(()=>{
        isAuthenticated() && Router.push(`/`)
    },[])

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setInfo({ ...info, loading:true, error:false });
        const user = {email, password };

        login(user).then(data => {

            // console.log("data.error",data.name)

            if (data.error) {
                setInfo({ ...info, error: data.error, loading: false });
            } else {
                // user token to cookie
                // user information to localstorage
                // authenticate the user
                authenticate(data,()=>{
                    if(isAuthenticated() && isAuthenticated().role === 1){
                        Router.push(`/adminDashboard`)
                    } else {
                        Router.push(`/userDashboard`)
                    }
                })
                
            }
        });
    };

    const handleChange= name =>(event)=>{
        setInfo({...info,error:false,[name]: event.target.value});
    }

    const showLoading = () =>(loading ? <div className= "alert alert-success">Loading.....</div> : "");
    const showError = () =>(error ? <div className= "alert alert-danger">{error}</div> : "");
    
    const showMessage = () =>(message ? <div className= "alert alert-primary">{message}</div> : "");
    
    const loginForm=()=>{
    return (

        <form onSubmit={handleSubmit}>
         {/* Email */}
         <div className="form-group">
            <input type="email" value={email} className="form-control" onChange={handleChange("email")} placeholder="Enter your @Email address"/>
        </div>
        {/* Password */}
         <div className="form-group">
            <input type="password" value={password} className="form-control" onChange={handleChange("password")} placeholder="New password"/>
        </div>
        {/* <div className =  */}
        <div className="col text-center">
        <button className="btn btn-info pt-3 pb-3 pl-5 pr-5">Login{` `}<VpnKeyIcon/>{` `}</button>
        </div>
        </form>
    )
};

    return (
        <>
        {showError()}
        {showLoading()}
        {showMessage()}
        {showForm && loginForm()}
        </>
    )
}

export default LoginAuth;
