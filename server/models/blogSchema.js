const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 5,
            max: 150,
            required: true
        },
        slug: {
            type: String,
            unique: true,
            index: true
        },
        body: {
            type: {},
            required: true,
            min: 300,
            max: 3000000
        },
        excerpt: {
            type: String,
            max: 1000
        },
        mtitle: {
            type: String
        },
        mdesc: {
            type: String
        },
        photo: {
            data: Buffer,
            contentType: String
        },
        categories:[{type: ObjectId, ref:"Category",required:true}],
        taglists:[{type: ObjectId, ref:"Tag",required:true}],
        postedBy:{
            type: ObjectId,
            ref:"Users"
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);