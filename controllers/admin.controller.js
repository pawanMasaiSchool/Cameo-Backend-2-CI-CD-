const Celebrity = require("../models/celebrities.model");

const adminGetAllCelebs = async (req,res) => {
    try{
        const allCelebs = await Celebrity.find();
        if(!allCelebs){
            return res.status(400).send('No data found')
        }
        res.status(200).json(allCelebs)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const adminGetCelebById = async (req,res) => {
    try{
        const [celeb] = await Celebrity.find({celeb_id:req.params.celeb_id})
        if(!celeb){
            return res.status(400).send('Celebrity Does Not Exists')
        }
        return res.status(200).json(celeb)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const admindeleteCelebrity = async (req,res) => {
    try{
        const celeb = await Celebrity.findOneAndDelete({celeb_id:req.params.celeb_id},{returnOriginal:true});
        if(!celeb){
            return res.status(200).send("Celebrity does not exist")
        }
        return res.status(200).json(celeb)
    }
    catch(err){
        res.status(400).send(err.toString())
    }
}

const adminUpdateCelebrity = async (req,res) => {
    try{
        
        
        const celeb = await Celebrity.findOne({celeb_id:req.params.celeb_id})

        const updatedCeleb = await Celebrity.findOneAndUpdate({celeb_id:req.params.celeb_id},
            {
            $set:{
                name:req.body.name || celeb.name,
                price: req.body.price || celeb.price,
            }
        },{
            returnOriginal:false
        })
        if(!updatedCeleb){
            return res.status(503).json("Celeb Details not updated")
        }
        return res.status(200).json(updatedCeleb)
    }
    catch(err){
        res.status(400).send(err.toString())
    }
}

module.exports = {admindeleteCelebrity,adminGetAllCelebs,adminGetCelebById,adminUpdateCelebrity}