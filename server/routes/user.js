const express = require('express')
const router = express.Router();
const {requireLogin,authenticationMiddleware} = require("../controllers/userAuthentication.js")
const {profileReadRequest} = require("../controllers/user.js")

router.get('/profile',requireLogin,authenticationMiddleware,profileReadRequest);

  module.exports = router;
