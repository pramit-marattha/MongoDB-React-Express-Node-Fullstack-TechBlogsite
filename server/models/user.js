const mongoose = require('mongoose');
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim:true,
        unique: true,
        max:32,
        index:true,
        lowercase:true
    },
    name: {
        type: String,
        required: true,
        trim:true,
        max:32,
    },
    email: {
        type: String,
        required: true,
        trim:true,
        unique: true,
        lowercase:true
    },
    profile: {
        type: String,
        required: true,
    }
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    about:{
        type:String
    },
    role:{
        type:Number,
        trim:true
    },
    photo:{
        data:Buffer,
        contentType: String
    },
    resetPasswordLink:{
        data:String,
        deafult:""
    }
},{timestamp: true});

UserSchema.virtual("password").set(function(password){
    // create a temp var _password
    this._password  = password
    // generate salt
    this.salt= this.makeSalt()
    // encrypt password
    this.hashed_password = this.encryptPassword(password);
}).get(function(){
    return this._password;
});

UserSchema.methods = {
    encryptPassword: function(password){
        if(!password) return ""
        try {
            return crypto.createHmac("sha1",this.salt).update(password).digest("hex")
        } catch(err) {

        }
    }
}


module.exports = mongoose.model("Users",UserSchema);