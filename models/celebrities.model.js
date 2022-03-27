const mongoose= require('mongoose')

const reviewsSchema= new mongoose.Schema({
    date:{type:Date,default:Date.now},
    reviewer_name:{type:String},
    comments:{type:String},
    stars:{type:Number}
})

const celebritiesSchema= new mongoose.Schema({
    name:{type:String,required:true},
    heading:{type:String,required:true},
    about:{type:String,required:true},
    price:{
        personal:{type:Number,required:true},
        buisness:{type:Number,required:true},
        cameo:{type:Number,default:null},
    },
    category:{type:String,required:true},
    sub_category1:{type:String,required:true},
    sub_category2:{type:String,required:true},
    image_urls:{type:Array,required:true},
    video_urls:{
        intro:{type:String,required:true},
        birthdayCelebration:{type:Array},
        pepTalk:{type:Array}
    },
    fans:{type:Number,default:0},
    delivery_24hr:{type:Boolean,default:false}, 
    rating:{type:Number,default:null},
    reviews:[reviewsSchema],
    tags:{type:Array},
    highlight:{type:Array},
    celeb_id:{type:String,required:true,unique:true}
})

const Celebrity= mongoose.model('celebrities',celebritiesSchema)

module.exports= Celebrity
