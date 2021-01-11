const express = require('express')
const router = express.Router();
const {baseTimeRoute} = require("../controllers/blog.js")

router.get('/',baseTimeRoute);

  module.exports = router;
