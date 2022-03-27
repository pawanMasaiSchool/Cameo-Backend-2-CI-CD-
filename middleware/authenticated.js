const jwt= require("jsonwebtoken")
const User = require("../models/users.model")

const verifyToken=(token)=>{
      return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
            if(err){
                return reject(err)
            }
            return resolve(decoded)
        })
      } ) 
}
const authenticated = async (req,res,next)=>{
    try{
        //check if token is passed
        const bearer= req.headers.authorization
        if(!bearer || !bearer.startsWith('Bearer ')){
            return res.status(401).json({status:'failure', message:'No token available'})
        }
        const token= bearer.split('Bearer ')[1].trim()
        //verify token
        const decoded = await verifyToken(token)
        if(!decoded) {
            return res.status(401).json({status:'failure', message:'Invalid token'})
        }
        const user = await User.findById(decoded.id).select('-password')
        if(!user){
            return res.status(401).json({status:'failure', message:'User does not exist'})
        }

        req.user=user
        next()
    }
    catch(err){
        return res.status(401).json({status:'failure', message:err.toString()})
    }
}

module.exports= authenticated