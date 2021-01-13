const User = require("../models/user");

exports.profileReadRequest = (req,res) =>{
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
};
