const User = require("../models/user");
const Blog = require("../models/blogSchema");
const {errorHandler} = require("../helpers/databaseErrorHandler");



exports.profileReadRequest = (req,res) =>{
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
};

exports.publicProfileReadRequest=(req,res)=>{
    let username = req.params.username
    let user;
    let blogs;

    User.findOne({username}).exec((err,userFromDB)=>{
        if( err || !userFromDB){
            return res.status(400).json({
                error: "User not found"
            })
        }
        user = userFromDB
        Blog.find({postedBy: user._id}).populate("categories","_id name slug").populate("taglists","_id name slug").populate("postedBy","_id name").limit(10).select("_id title slug excerpt categories taglists postedBy createdAt updatedAt")
        .exec((err,data) => {
            if (err){
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }
            user.photo = undefined
            res.json({
                user,blogs: data
            })
        })
    })
} 