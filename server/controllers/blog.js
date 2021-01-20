// for creating forms
const formidable = require("formidable");
// to create slugs
const slugify = require("slugify");
// stripping the html from the body to create excerpt
// const stripHtml = require("string-strip-html");
const stripHtml = require("cli-strip-html");
// lodash for updating the blogs
const _ = require("lodash");
// models 
const Blog = require("../models/blogSchema");
const Category = require("../models/categorySchema");
const Tag = require("../models/tagSchema");
const User = require("../models/user");
// Handling errors (sending mongoose error to the client)
const {errorHandler} = require("../helpers/databaseErrorHandler");
// node js file system
const fs = require("fs");
// excerpt trim 
const {excerptTrim} = require("../helpers/excerptTrim");
require("dotenv").config();

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
      if (err) {
          return res.status(400).json({
              error: 'Image upload failure'
          });
      }


      const { title, body, categories, taglists } = fields;


      if (!title || !title.length) {
          return res.status(400).json({
              error: `--------------------->Title is required<----------------------`
          });
      }

      if (!body || body.length < 200) {         
          return res.status(400).json({
              error: `-------------------->Blog is either short or too big<----------------------`
          });
      }

      if (!categories || categories.length === 0) {
          return res.status(400).json({
              error: '------------------->Please select at least one category<-----------------'
          });
      }

      if (!taglists || taglists.length === 0) {
          return res.status(400).json({
              error: '---------------------->Please select at least one tag<--------------------'
          });
      }

      let blog = new Blog();
      blog.title = title;
      blog.body = body;
      // console.log("rerererr",body)
      blog.excerpt = excerptTrim(body, 160, ' ', '.....');
      blog.slug = slugify(title).toLowerCase();
      blog.mtitle = `${title} | ${process.env.BLOG_NAME}`;
      blog.mdesc = stripHtml(body.substring(0,160));
      blog.postedBy = req.user._id;
      // categories and tags
      let allTheListOfCategories = categories && categories.split(',');
      let allTheListOfTags = taglists && taglists.split(',');
      if (files.photo) {
          if (files.photo.size > 10000000) {
              return res.status(400).json({
                  error: 'Image size too big'
              });
          }

          blog.photo.data = fs.readFileSync(files.photo.path);
          blog.photo.contentType = files.photo.type;
      }
      blog.save((err, result) => {
          if (err) {
        // console.log("error_is_here",err)

              return res.status(400).json({
                  // error: "wrong bitch"
                  error: errorHandler(err)
              });
          }
          // res.json(result);
          Blog.findByIdAndUpdate(result._id, { $push: { categories: allTheListOfCategories } }, { new: true }).exec(
              (err, result) => {
                  if (err) {
                      return res.status(400).json({
                          error: errorHandler(err)
                      });
                  } else {
                      Blog.findByIdAndUpdate(result._id, { $push: { taglists: allTheListOfTags } }, { new: true }).exec(
                          (err, result) => {
                              if (err) {
                                  return res.status(400).json({
                                      error: errorHandler(err)
                                  });
                              } else {
                                  res.json(result);
                              }
                          }
                      );
                  }
              }
          )
      });
  });
};

//list,bloglistsallCategoriesTags,read,remove,update

exports.list =(req,res)=>{
    Blog.find({}).populate("categories","_id name slug").populate("taglists","_id name slug").populate("postedBy","_id name username") // second arguments is for particularly pupulating that specific field
    .select("_id title slug excerpt categories taglists postedBy createdAt updatedAt").exec((err,data)=>{
        if (err){
            return res.json({
                error: errorHandler(err)
            })
        }
        res.json(data)
    })
}

exports.bloglistsallCategoriesTags =(req,res)=>{
    let limit = req.body.limit ? parseInt(req.body.limit) : 10
    let skip = req.body.skip ? parseInt(req.body.skip) : 0
    let blogs 
    let categories
    let tags 
    Blog.find({}).populate("categories","_id name slug").populate("taglists","_id name slug")
    .populate("postedBy","_id name username profile").sort({createdAt: -1}).skip(skip).limit(limit) // second arguments is for particularly pupulating that specific field
    .select("_id title slug excerpt categories taglists postedBy createdAt updatedAt")
    .exec((err,data)=>{
        if (err){
            return res.json({
                error: errorHandler(err)
            })
        }
        blogs = data // we get all the blogs
        // getting all the categories
        Category.find({}).exec((err,cat)=>{
            if (err){
                return res.json({
                    error: errorHandler(err)
                })
            }
            categories = cat // get all the categories
            // getting all the tags
            Tag.find({}).exec((err,tagg)=>{
                if (err){
                    return res.json({
                        error: errorHandler(err)
                    })
                }
                tags = tagg
                // return all the categories ,tags and the blogs
                res.json({blogs,categories,tags,size: blogs.length});
            })
        })
    })

}

exports.read =(req,res)=>{
    const slug = req.params.slug.toLowerCase();
    Blogs.findOne({slug}).populate("categories","_id name slug").populate("taglists","_id name slug").populate("postedBy","_id name username").select("_id title body slug mtitle mdesc categories taglists postedBy createdAt updatedAt").exec((err,data)=>{
        if (err){
            return res.json({
                error: errorHandler(err)
            })
        }
        res.json(data);
    })
}

exports.remove =(req,res)=>{
    const slug = req.params.slug.toLowerCase();
    Blog.findOneAndRemove({slug}).exec((err,data)=>{
        if(err){
            return res.json({
                error: errorHandler(err)
            })
        }
        res.json({
            message: "Blog has been succesfully deleted"
        })
    })
};

exports.update =(req,res)=>{
    
}