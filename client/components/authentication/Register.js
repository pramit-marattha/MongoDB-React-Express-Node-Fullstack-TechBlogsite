import React,{useState} from 'react';

const Register = () => {

    const [info,setInfo] = useState({name:"",email:"",password:"",error:"",loading:false,message:"",showForm:true});

    const {name,email,password,error,loading,message,showForm} = info

    const handleSubmit=(event)=>{
        event.preventDefault();
        console.table({name,email,password,error,loading,message,showForm})
    }

    const handleChange= name =>(event)=>{
        setInfo({...info,error:false,[name]: e.target.value});
    }
    const registerForm=()=>{
    return (
        <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="form-group">
        {/* dynamic handle change by passing the value straight to it */}
            <input type="text" value={name} className="form-control" onChange={handleChange("name")} placeholder="Enter Your Name"/> 
        </div>
         {/* Email */}
         <div className="form-group">
            <input type="email" value={email} className="form-control" onChange={handleChange("email")} placeholder="Enter Your @Email address"/>
        </div>
        {/* Password */}
         <div className="form-group">
            <input type="password" value={password} className="form-control" onChange={handleChange("password")} placeholder="Enter Your password"/>
        </div>
        <button className="btn btn-info">Register</button>
        </form>
    )
}
    return (
        <>
            {registerForm()}
        </>
    )
}

export default Register
