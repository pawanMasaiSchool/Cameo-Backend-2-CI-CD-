const { validationResult } = require('express-validator')
const jwt= require('jsonwebtoken')
const User = require('../models/users.model')
require('dotenv').config()

const generateToken= (user)=>{
    //synchronous in nature
    return jwt.sign({
        id:user._id,
        email: user.email
    },process.env.SECRET_KEY
    )
}

const signup = async (req,res)=>{
    const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
    try{
        const user= await User.create({
            email:req.body.email,
            username:String(req.body.email.split('@')[0]),
            name:req.body.name,
            twitter_handle:'',
            profile_picture:'https://t4.ftcdn.net/jpg/02/23/50/73/360_F_223507349_F5RFU3kL6eMt5LijOaMbWLeHUTv165CB.jpg',
            following:[],
            orders:[],
            password:req.body.password,
            role:'user',
            bio:''
        })
        const token =generateToken(user)
        res.status(201).json({status:'success',data:{
            email:user.email,
            token
        }})
    }
    catch(err){
        res.status(400).json({status:'failure',msg:err.toString()})
    }
}

const signin= async (req,res)=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    let user
    try{
        user= await User.findOne({email:req.body.email}).exec()

        if(!user){
            return res.status(401).json({status:'failure', message:'Invalid email or password'})
        }
    }
    catch(err){
        return res.status(500).json({status:'failure', message:err.toString()})
    }
    let match
    try{
       match= await user.checkPassword(req.body.password)
            if(!match){
                return res.status(401).json({status:'failure', message:'Invalid email or password'})
            }
    }
    catch(err){
        return res.status(500).json({status:'failure', message:err.toString()})
    }
    const token= generateToken(user)
    return res.status(200).json({status:'Success',data:{
        email:user.email,
        token
    }})
}

module.exports={generateToken,signin,signup}