const express = require('express');
const router = express.Router();
const {create} = require("../controllers/blog.js");
const {requireLogin,adminAuthenticationMiddleware} = require("../controllers/userAuthentication.js");

router.post('/blog',requireLogin,adminAuthenticationMiddleware,create);

module.exports = router;
