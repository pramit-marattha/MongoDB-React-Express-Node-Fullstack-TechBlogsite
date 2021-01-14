const express = require('express')
const router = express.Router();
const {create,list,read,remove} = require("../controllers/category.js")
const {requireLogin,adminAuthenticationMiddleware} = require("../controllers/userAuthentication.js")

const {runValidation} = require("../validators")
const {createCategoryValidator} = require("../validators/category")

router.post('/category',createCategoryValidator,runValidation,requireLogin,adminAuthenticationMiddleware,create);
router.get('/categories',list)
router.get('/category/:slug',read)
router.delete('/category/:slug',requireLogin,adminAuthenticationMiddleware,remove)

  module.exports = router;
