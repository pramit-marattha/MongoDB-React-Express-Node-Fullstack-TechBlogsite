const express = require('express');
const router = express.Router();
const {create ,list,bloglistsallCategoriesTags,read,remove,update} = require("../controllers/blog.js");
const {requireLogin,adminAuthenticationMiddleware} = require("../controllers/userAuthentication.js");

router.post('/blog',requireLogin,adminAuthenticationMiddleware,create);
router.get('/bloglists',list);
router.post('/bloglists-categories-taglists',bloglistsallCategoriesTags);
router.get('/blog/:slug',read);
router.delete('/blog/:slug',requireLogin,adminAuthenticationMiddleware,remove);
router.put('/blog/:slug',requireLogin,adminAuthenticationMiddleware,update);


module.exports = router;
