import React,{useState,useEffect} from "react";
import Link from "next/link";
import Router from "next/router";
import {isAuthenticated,getCookie} from "../../actions/authentication";
import {create,getTagLists,removeTag} from "../../actions/tag";
import CategoryIcon from '@material-ui/icons/Category';
import AddIcon from '@material-ui/icons/Add';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';


const Tag =()=>{
    const [infos,setInfos] = useState({name:"",error:false,success:false,taglists:[],removed:false,reload:false});

    const {name,error,success,taglists,removed,reload} = infos
    const token = getCookie("token")

    const processTagLists = ()=>{
        getTagLists().then(data=>{
            if (data.error){
                console.log(data.error)
            }else{
                setInfos({...infos,taglists: data})
            }
        });
    };

    const removeTheSelectedTag = (slug) =>{
        removeTag(slug,token).then(data =>{
            if (data.error){
                console.log(data.error)
            }else{
                setInfos({...infos,name:"",error:false,success:false,removed:!removed,reload:!reload})
            }
        })
    }

    const doubleClickDelete = (slug)=>{
        let confirmation = window.confirm("Delete this Tag ?")
        if (confirmation){
            removeTheSelectedTag(slug)
        }
    };   
// console.log("ahahahahaha",categories)
    const loopingThroughTagLists =()=>{
        return taglists.map((tagg,index)=>{
            return (
                <button onDoubleClick={()=>doubleClickDelete(tagg.slug)} title="Double Tap to delete tag" key={index} className="btn btn-outline-primary mr-1 ml-1 mt-4">{tagg.name}</button>
            )
        });
    };



    useEffect(()=>{
        processTagLists();
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

    const errorCreatingTag = ()=>{
        if (error){
            return (
                <h4 className="text-danger">Duplicate Tag</h4>
            )
        };
    };

    // const removedCategorySuccessfully =()=>{
    //     if (removed){
    //         return (
    //             <h4 className="text-danger">Category Deleted Successfully</h4>
    //         )
    //     };
    // };

    const mouseHndler =(event)=>{
        setInfos({...infos,error:false,success:false,removed:""})
    }


    const newTagForm =()=>(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">
                    Enter "Tag" Name:
                </label>
                <input type="text" className="form-control" onChange={handleChange} value={name} required/>
            </div>
            <div>
            <button type="submit" className="btn btn-info">
            <AddIcon/>
            {" "}
            Add Tag
            {" "}
            <LocalOfferIcon/>
            </button>
            </div>
        </form>
    );

    return (
        <>
        {/* {createdCategorySuccessfully()} */}
        {errorCreatingTag()}
        {/* {removedCategorySuccessfully()} */}

        <div onMouseMove={mouseHndler}>
        {newTagForm()}
        {loopingThroughTagLists()}
        </div>
        </>
    );
};

export default Tag;