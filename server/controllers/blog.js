// for creating forms
const formidable = require("formidable");
// to create slugs
const slugify = require("slugify");
// stripping the html from the body to create excerpt
const stripHtml = require("string-strip-html");
// lodash for updating the blogs
const _ = require("lodash");
// models 
const Blog = require("../models/blogSchema");
const Category = require("../models/categorySchema");
const Tag = require("../models/tagSchema");
// Handling errors (sending mongoose error to the client)
const {errorHandler} = require("../helpers/databaseErrorHandler");
// node js file system
const fs = require("fs");


exports.create = (req,res)=>{
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req,(err,fields,files)=>{
    if(err){
      return res.status(400).json({
        error: "Image Upload failed"
      })
    }
    const {title,body,categories,taglists} = fields
    let blog = new Blog()
    blog.title = fields.title
    blog.body = fields.body
    blog.slug = slugify(title).toLowerCase()
    blog.mtitle = `${title} | ${process.env.BLOG_NAME}`
    blog.mdesc = stripHtml(body.substring(0,150))
    blog.postedBy = req.user._id

    // blog.categories = fields.categories
    // blog.taglists = fields.taglists
    if(files.photo){
      if(files.photo.size > 10000000){
        return res.status(400).json({
          error: "Image size tooo large"
        });
      }
      blog.photo.data = fs.readFileSync(files.photo.path)
      blog.photo.contentType = files.photo.type
    }
    blog.save((err,result)=>{
      if (err){
        return res.status(400).json({
          error: errorHandler(err)
        });
      }
      res.json(result);
    })
  })
  }
