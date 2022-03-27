const express= require('express')
const { getAllCelebrities, getCelebritiesByID, getCelebritiesByHighlight, getCelebritiesBySubCategory,getCelebBySearch } = require('../controllers/celebrities.controller')
const router= express.Router()

router.get('/celebs',getAllCelebrities)
router.get('/celebs/celeb/:celeb_id',getCelebritiesByID)
router.get('/celebs/highlight',getCelebritiesByHighlight)
router.get('/celebs/sub_category',getCelebritiesBySubCategory)
router.get('/celebs/search/:text',getCelebBySearch)

module.exports=router