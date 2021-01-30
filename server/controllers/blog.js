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
                taglists = tagg
                // return all the categories ,tags and the blogs
                res.json({blogs,categories,taglists,size: blogs.length});
            })
        })
    })

}

exports.read =(req,res)=>{
    const slug = req.params.slug.toLowerCase();
    Blog.findOne({slug}).populate("categories","_id name slug").populate("taglists","_id name slug").populate("postedBy","_id name username").select("_id title body slug mtitle mdesc categories taglists postedBy createdAt updatedAt").exec((err,data)=>{
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


exports.update = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    Blog.findOne({ slug }).exec((err, oldBlog) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        let form = new formidable.IncomingForm();
        form.keepExtensions = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                return res.status(400).json({
                    error: 'Image could not upload'
                });
            }

            let slugBeforeMerge = oldBlog.slug;
            oldBlog = _.merge(oldBlog, fields);
            oldBlog.slug = slugBeforeMerge;

            const { body, mdesc, categories, taglists } = fields;

            if (body) {
                oldBlog.excerpt = excerptTrim(body, 320, ' ', ' ...');
                oldBlog.mdesc = stripHtml(body.substring(0, 160));
            }

            if (categories) {
                oldBlog.categories = categories.split(',');
            }

            if (taglists) {
                oldBlog.taglists = taglists.split(',');
            }

            if (files.photo) {
                if (files.photo.size > 10000000) {
                    return res.status(400).json({
                        error: 'Image should be less then 1mb in size'
                    });
                }
                oldBlog.photo.data = fs.readFileSync(files.photo.path);
                oldBlog.photo.contentType = files.photo.type;
            }

            oldBlog.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    });
                }
                // result.photo = undefined;
                res.json(result);
            });
        });
    });
};

exports.photo =(req,res)=>{
    const slug = req.params.slug.toLowerCase();
    Blog.findOne({slug}).select("photo").exec((err,blog)=>{
        if (err || !blog) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }
        res.set('Content-Type',blog.photo.contentType)
        return res.send(blog.photo.data);
    })
};

exports.blogListRelated=(req,res)=>{
    let limit = req.body.limit ? parseInt(req.body.limit) : 3

    const {_id,categories} = req.body.blog

    // not including _id but including categories
    // while showing related blogs excluding the blog itself and showing other blogs instead
    Blog.find({_id: {$ne: _id},categories: {$in: categories}}).limit(limit).populate('postedBy','_id name profile').select('slug title excerpt postedBy createdAt updatedAt')
    .exec((err,blogs)=>{
        if (err){
            return res.status(400).json({   
                error: "Blog not found"
            })
        }
        res.json(blogs);
    })
};

exports.listSearchItems=(req,res)=>{
    const {search}= req.query
    if(search){
        Blog.find({
            $or: [{title:{$regex: search,$options: 'i' }},{body:{$regex: search,$options:"i"}}]
        },(err,blogs)=>{
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(blogs)
        }).select("-photo -body");
    }
};

