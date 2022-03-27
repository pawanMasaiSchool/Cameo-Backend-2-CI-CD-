const express = require('express');
const { adminGetAllCelebs,admindeleteCelebrity,adminGetCelebById, adminUpdateCelebrity } = require('../controllers/admin.controller');


const router = express.Router();


router.get('/admin/celebs',adminGetAllCelebs);
router.get('/admin/celebs/:celeb_id',adminGetCelebById);
router.delete('/admin/celebs/:celeb_id', admindeleteCelebrity);
router.post("/admin/update/celebs/:celeb_id",adminUpdateCelebrity);

module.exports = router