const express = require('express');
const {placeOrderOfUser, getOrdersOfUser, getOrdersofCelebrity, updateOrder} = require('../controllers/order.controller')
const authenticated = require('../middleware/authenticated')
const {addOrderInUser}= require('../controllers/user.controller')
const router = express.Router()

// router.get('/orders/:username',authenticated,getOrdersOfUser);
// router.patch('/orders/:username',authenticated,placeOrderOfUser);
router.post('/orders/create',authenticated,placeOrderOfUser,addOrderInUser)
router.get('/orders',authenticated,getOrdersOfUser)
router.get('/orders/celebrity/:celeb_id',getOrdersofCelebrity)
router.patch('/orders/video/edit',updateOrder)

module.exports=router
