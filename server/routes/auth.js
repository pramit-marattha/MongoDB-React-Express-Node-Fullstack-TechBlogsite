const express = require('express')
const router = express.Router();
const {signup,login,logout} = require("../controllers/userAuthentication.js")
// const {signin} = require("../controllers")
// importing validators
const {runValidation} = require("../validators")
const {userSignupValidator,userLoginValidator} = require("../validators/auth")

router.post('/signup',userSignupValidator,runValidation,signup);
router.post('/login',userLoginValidator,runValidation,login);
router.get('/logout',logout);

  module.exports = router;
