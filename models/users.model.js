const mongoose = require("mongoose");

const bcrypt= require('bcrypt')

const UserSchema = new mongoose.Schema({
    email:{type: String, required:true, unique:true},
    password:{type: String},
    bio:{type:String},
    username:{type:String},
    name:{type:String},
    twitter_handle:{type:String},
    profile_picture:{type:String},
    following:{type:Array},
    orders:{type:Array},
    role:{type:String}
 })

UserSchema.methods.checkPassword= function(password){
    const hashedPassword= this.password
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,hashedPassword,(err,same)=>{
            if(err){
                return reject(err)
            }
            resolve(same)
        })
    })
} 

UserSchema.pre('save',function(next){
    bcrypt.hash(this.password,10,(err,hash)=>{
        if(!this.isModified('password')){
            return next()
        }
        if(!this.password) return next()
        if(err){
            return next(err)
        }
        this.password=hash
        next()
    })
})

const User = mongoose.model("users", UserSchema);

module.exports = User;