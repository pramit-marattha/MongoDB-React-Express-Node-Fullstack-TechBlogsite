import React,{useState} from 'react';
import {signup} from "../../actions/authentication.js";

const Register = () => {

    const [info,setInfo] = useState({name:"",email:"",password:"",error:"",loading:false,message:"",showForm:true});

    const {name,email,password,error,loading,message,showForm} = info

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ name, email, password, error, loading, message, showForm });
        setInfo({ ...info, loading:true, error:false });
        const user = { name, email, password };

        signup(user).then(data => {

            // console.log("data.error",data.name)

            if (data.error) {
                setInfo({ ...info, error: data.error, loading: false });
            } else {
                setInfo({...info,name: '',email: '',password: '',error: '',loading: false,message: data.message,showForm: false});
            }
        });
    };

    const handleChange= name =>(event)=>{
        setInfo({...info,error:false,[name]: event.target.value});
    }

    const showLoading = () =>(loading ? <div className= "alert alert-success">Loading.....</div> : "");
    const showError = () =>(error ? <div className= "alert alert-danger">{error}</div> : "");
    
    const showMessage = () =>(message ? <div className= "alert alert-primary">{message}</div> : "");
    
    const registerForm=()=>{
    return (

        <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
        {/* dynamic handle change by passing the value straight to it */}
            <input type="text" value={name} className="form-control" onChange={handleChange("name")} placeholder="Enter Full Name"/> 
        </div>
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
        <button className="btn btn-info pt-3 pb-3 pl-5 pr-5">Register</button>
        </div>
        </form>
    )
};

    return (
        <>
        {showError()}
        {showLoading()}
        {showMessage()}
        {showForm && registerForm()}
        </>
    )
}

export default Register
