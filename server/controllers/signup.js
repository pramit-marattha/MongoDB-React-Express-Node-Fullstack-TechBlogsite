const User = require("../models/user");
const shortId = require("shortid")

exports.signup = (req,res)=>{
    // const {name,email,password} = req.body
    // res.json({
    //     user:{name,email,password}
    // });
    
    // if user exist 
    User.findOne({email: req.body.email}).exec((err,user)=>{
        if(user){
            return res.status(400).json({
                error: "Email already exists"
            })
        }
        // if not 
        const {name,email,password} = req.body
        let username = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        // create a new user
        let newUser = new User({name,email,password,profile,username})
        // save that user
        newUser.save((err,success)=>{
            if(err){
                return res.status(400).json({
                    error:err
                })
            }
            res.json({
                message: "Completed Signup process.Please Login to continue"
            })
            // res.json({
            //     user: success
            // })
        })
    })
};