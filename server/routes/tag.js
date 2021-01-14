const express = require('express')
const router = express.Router();
const {create,list,read,remove} = require("../controllers/tag.js")
const {requireLogin,adminAuthenticationMiddleware} = require("../controllers/userAuthentication.js")

const {runValidation} = require("../validators")
const {createTagValidator} = require("../validators/Tag")

router.post('/tag',createTagValidator,runValidation,requireLogin,adminAuthenticationMiddleware,create);
router.get('/taglists',list)
router.get('/tag/:slug',read)
router.delete('/tag/:slug',requireLogin,adminAuthenticationMiddleware,remove)

  module.exports = router;
 