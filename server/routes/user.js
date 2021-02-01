const express = require('express')
const router = express.Router();
const {requireLogin,authenticationMiddleware} = require("../controllers/userAuthentication.js")
const {profileReadRequest,publicProfileReadRequest} = require("../controllers/user.js")

router.get('/profile',requireLogin,authenticationMiddleware,profileReadRequest);
router.get('/user/:username',publicProfileReadRequest);

  module.exports = router;
