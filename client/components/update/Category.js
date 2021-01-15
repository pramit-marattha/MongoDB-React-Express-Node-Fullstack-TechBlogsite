import React,{useState,useEffect} from "react";
import Link from "next/link";
import Router from "next/router";
import {isAuthenticated,getCookie} from "../../actions/authentication";
import {create} from "../../actions/category";


const Category =()=>{
    const [infos,setInfos] = useState({name:"",error:false,success:false,categories:[],removed:false});

    const {name,error,success,categories,removed} = infos
    const token = getCookie("token")


    const handleSubmit =(event)=>{
        event.preventDefault()
        // console.log("create",name)
        create({name},token).then(data=>{
            if(data.error){
                setInfos({...infos,error:data.error,success:false})
            } else{
                setInfos({...infos,error:false,success:true,name:""})
            }
        });
    };


    const handleChange =(event)=>{
        setInfos({...infos,name:event.target.value,error:false,success:false,remove:""})

    }

    const newCategoryForm =()=>(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">
                    Name
                </label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required/>
            </div>
            <div>
            <button type="submit" className="btn btn-info">Create</button>
            </div>
        </form>
    );

    return (
        <>
        {newCategoryForm()}
        </>
    )





}

export default Category;