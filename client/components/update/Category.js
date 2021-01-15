import React,{useState,useEffect} from "react";
import Link from "next/link";
import Router from "next/router";
import {isAuthenticated,getCookie} from "../../actions/authentication";
import {create,getCategories,removeCategory} from "../../actions/category";
import CategoryIcon from '@material-ui/icons/Category';
import AddIcon from '@material-ui/icons/Add';


const Category =()=>{
    const [infos,setInfos] = useState({name:"",error:false,success:false,categories:[],removed:false,reload:false});

    const {name,error,success,categories,removed,reload} = infos
    const token = getCookie("token")

    const processCategories = ()=>{
        getCategories().then(data=>{
            if (data.error){
                console.log(data.error)
            }else{
                setInfos({...infos,categories: data})
            }
        });
    };

    const removeTheSelectedCategory = (slug) =>{
        removeCategory(slug,token).then(data =>{
            if (data.error){
                console.log(data.error)
            }else{
                setInfos({...infos,name:"",error:false,success:false,removed:!removed,reload:!reload})
            }
        })
    }

    const doubleClickDelete = (slug)=>{
        let confirmation = window.confirm("Delete this category ?")
        if (confirmation){
            removeTheSelectedCategory(slug)
        }
    };   
// console.log("ahahahahaha",categories)
    const loopingThroughCategories =()=>{
        return categories.map((cat,index)=>{
            return (
                <button onDoubleClick={()=>doubleClickDelete(cat.slug)} title="Double Tap to delete" key={index} className="btn btn-outline-info mr-1 ml-1 mt-4">{cat.name}</button>
            )
        });
    };



    useEffect(()=>{
        processCategories();
    },[reload])

    const handleSubmit =(event)=>{
        event.preventDefault()
        // console.log("create",name)
        create({name},token).then(data=>{
            if(data.error){
                setInfos({...infos,error:data.error,success:false})
            } else{
                setInfos({...infos,name:"",error:false,success:false,removed:!removed,reload:!reload})
            }
        });
    };


    const handleChange =(event)=>{
        setInfos({...infos,name:event.target.value, error:false, success:true, removed:""})
    }

    // const createdCategorySuccessfully = ()=>{
    //     if (success){
    //         return (
    //             <h4 className="text-info">Category Created Successfully</h4>
    //         )
    //     };
    // };

    const errorCreatingCategory = ()=>{
        if (error){
            return (
                <h4 className="text-danger">Duplicate Catagory</h4>
            )
        };
    };

    const removedCategorySuccessfully =()=>{
        if (removed){
            return (
                <h4 className="text-danger">Category Deleted Successfully</h4>
            )
        };
    };

    const mouseHndler =(event)=>{
        setInfos({...infos,error:false,success:false,removed:""})
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
            <button type="submit" className="btn btn-info">
            <AddIcon/>
            {" "}
            Add Category
            {" "}
            <CategoryIcon/>
            </button>
            </div>
        </form>
    );

    return (
        <>
        {/* {createdCategorySuccessfully()} */}
        {errorCreatingCategory()}
        {/* {removedCategorySuccessfully()} */}

        <div onMouseMove={mouseHndler}>
        {newCategoryForm()}
        {loopingThroughCategories()}
        </div>
        </>
    );
};

export default Category;