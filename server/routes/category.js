const express = require('express')
const router = express.Router();
const {create} = require("../controllers/category.js")
const {requireLogin,adminAuthenticationMiddleware} = require("../controllers/userAuthentication.js")

const {runValidation} = require("../validators")
const {createCategoryValidator} = require("../validators/category")

router.post('/category',createCategoryValidator,runValidation,requireLogin,adminAuthenticationMiddleware,create);

  module.exports = router;
