const User = require("../models/user");
const shortId = require("shortid");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken")

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
                });
            };
            res.json({
                message: "Completed Signup process.Please Login to continue"
            });
            // res.json({
            //     user: success
            // })
        });
    });
};


exports.login = (req,res)=>{
    const {email,password} = req.body
    //checking user existence
    User.findOne({email}).exec((err,user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "You forgot to 'SignUp'.Email does not exist"
            });
        }
    // authenticate the user
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Email and password does not match"
            });
        }
    // token generation 
        const token = jwt.sign({_id: user._id},process.env.JWT_TOKEN_SECRET,{expiresIn: "365d"})  

        res.cookie("token",token,{expiresIn:"365d"})
        const {_id,username,name,email,role} = user
        return res.json({
            token, 
            user:{_id,username,name,email,role}
        })
    });

};

// signout and require login middlewares for protecting routes

exports.logout = (req,res)=>{
    res.clearCookie("token")
    res.json({
        message: "Successfully logged out"
    });
};


exports.requireLogin = expressJwt({
    secret: process.env.JWT_TOKEN_SECRET,
    algorithms: ['RS256'] 
});
