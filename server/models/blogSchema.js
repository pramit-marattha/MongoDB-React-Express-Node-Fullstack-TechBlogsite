const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const BlogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 1600,
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
            min: 200,
            max: 50000000
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
        categories: [
            { type: ObjectId,
             ref: 'Category',
             required:true,
             }],
        taglists: [{ 
            type: ObjectId,
             ref: 'Tag',
             required:true,
             }],
        postedBy: {
            type: ObjectId,
            ref: 'Users'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Blog', BlogSchema);