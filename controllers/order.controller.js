const Orders = require("../models/order.model")

const placeOrderOfUser = async (req,res,next) => {
    try{
        const order= await Orders.create({
            fore:req.body.fore,
            from:req.body.from,
            occassion:req.body.occassion,
            instructions:req.body.instructions,
            optional:req.body.optional,
            price:req.body.price,
            celeb_id:req.body.celeb_id,
            user_id:req.user.email,
            recieved:req.body.recieved,
            celeb_name:req.body.celeb_name,
            celeb_img:req.body.celeb_img,
            video_url:''
        })
        if(!order){
            return res.status(401).json({status:'failure', message:'Order not created'})
        }
        req.order= order
        next()
    }
    catch(err){
        res.status(500).json({status:'failure',msg:err.toString()})
    }
}

const getOrdersOfUser = async (req,res)=>{
    try{
        const orders = await Orders.find({user_id:req.user.email})
        if(!orders){
            return res.status(400).send('No orders found')
        }
        res.status(200).json(orders)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const getOrdersofCelebrity= async(req,res)=>{
    try{
        const orders = await Orders.find({celeb_id:req.params.celeb_id})
        if(!orders){
            return res.status(400).send('No orders found')
        }
        res.status(200).json(orders)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const updateOrder= async(req,res)=>{
    try{
        const order= await Orders.findOneAndUpdate({
            _id:req.body.id
        },{$set:{video_url:req.body.video,recieved:true}},{
            returnOriginal:false
        })
        if(!order){
            return res.status(400).json({msg:'User not found'})
        }
        return res.status(200).send(order)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

module.exports={
    placeOrderOfUser,
    getOrdersOfUser,getOrdersofCelebrity,updateOrder
}