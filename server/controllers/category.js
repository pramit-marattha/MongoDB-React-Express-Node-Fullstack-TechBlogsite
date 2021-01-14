const Category = require("../models/categorySchema");
const slugify = require("slugify");
const {errorHandler} = require("../helpers/databaseErrorHandler")

exports.create = (req,res)=>{
    const {name} = req.body
    let slug = slugify(name).toLowerCase()

    let category = new Category({name,slug})

    category.save((err,data)=>{
        if (err){
            return res.status(400).json({
                error:errorHandler(err)
            })
        }
        res.json(data)
    })
}