
const User = require("../models/users.model")

const getUser = async (req,res)=>{
    try{
        const [user]= await User.find({email:req.user.email})
        if(!user){
            return res.status(400).send('No record found')
        }
        res.status(200).json(user)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const getFollowing= async(req,res)=>{
    try{
        const user= await User.find({email:req.user.email})
        if(!user){
            return res.status(400).json({msg:'User not found'})
        }
        return res.status(200).json(user)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const removeFollowingInUser= async(req,res)=>{
    try{
        const user= await User.findOneAndUpdate({
            email:req.user.email
        },{
            $pull:{
                following:req.body.celeb_id
            }
        },{
            returnOriginal:false
        })
        if(!user){
            return res.status(400).json({msg:'User not found'})
        }
        return res.status(200).send('Removed celebrity from following')
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const addFollowingInUser= async(req,res)=>{
    try{
        const user= await User.findOneAndUpdate({
            email:req.user.email
        },{
            $addToSet:{
                following:req.body.celeb_id
            }
        },{
            returnOriginal:false
        })
        if(!user){
            return res.status(400).json({msg:'User not found'})
        }
        return res.status(200).send('Added celebrity to following')
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const updateUser= async(req,res)=>{
    try{
        const user= await User.findOneAndUpdate({
            email:req.user.email
        },{$set:{name:req.body.name,twitter_handle:req.body.twitter,bio:req.body.bio}},{
            returnOriginal:false
        })
        if(!user){
            return res.status(400).json({msg:'User not found'})
        }
        return res.status(200).send('Updated user')
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const addOrderInUser= async(req,res)=>{
    try{
        const user= await User.findOneAndUpdate({
            email:req.user.email
        },{
            $addToSet:{
                orders:req.order._id
            }
        },{
            returnOriginal:false
        })
        if(!user){
            return res.status(400).json({msg:'User not found'})
        }
        return res.status(200).send('Added Order to user')
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}


module.exports={getUser,addFollowingInUser,getFollowing,removeFollowingInUser,updateUser,addOrderInUser}