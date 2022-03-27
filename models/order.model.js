const mongoose= require('mongoose')

const orderSchema = new mongoose.Schema({
    fore:{type:String,required:true},
    from:{type:String,required:true},
    occassion:{type:String,required:true},
    instructions:{type:String,required:true},
    optional:{type:String},
    price:{type:Number,required:true},
    celeb_id:{type:String,required:true},
    user_id:{type:String,required:true},
    recieved:{type:Boolean,required:true},
    video_url:{type:String},
    celeb_name:{type:String,required:true},
    celeb_img:{type:String,required:true}
})

const Orders = mongoose.model('orders',orderSchema)

module.exports= Orders
