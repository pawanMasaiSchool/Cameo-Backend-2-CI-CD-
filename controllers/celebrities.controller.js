const req = require("express/lib/request")
const Celebrity = require("../models/celebrities.model")

const getAllCelebrities=async (req,res)=>{
    try{
        const celebrities= await Celebrity.find()
        if(!celebrities){
            return res.status(400).send('No data found')
        }
        res.status(200).json(celebrities)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const getCelebritiesByID= async(req,res)=>{
    try{
        const [celebrity]= await Celebrity.find({celeb_id:req.params.celeb_id})
        if(!celebrity){
            return res.status(400).send('No record found')
        }
        res.status(200).json(celebrity)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const getCelebritiesByHighlight= async(req,res)=>{
    try{
        const celebrity= await Celebrity.find({highlight:req.query.highlight})
        if(!celebrity){
            return res.status(400).send('No record found')
        }
        res.status(200).json(celebrity)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}

const getCelebritiesBySubCategory= async(req,res)=>{
    try{
        const celebrity= await Celebrity.find({category:req.query.sub_category})
        if(!celebrity){
            return res.status(400).send('No record found')
        }
        res.status(200).json(celebrity)
    }
    catch(err){
        return res.status(500).send(err.toString())
    }
}


const getCelebBySearch = async (req,res) => {
    const celeb = await Celebrity.find({$text:{$search: req.params.text}});
    if(!celeb){
        res.status(404).json("No celeb found")
    }
    res.status(200).json(celeb)
}

module.exports={
    getAllCelebrities,getCelebritiesByID,getCelebritiesByHighlight,getCelebritiesBySubCategory,getCelebBySearch
}