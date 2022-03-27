const express= require('express')
const router= express.Router()
const passport= require('../config/passport');
const { generateToken, signin, signup } = require('../controllers/auth.controlller');
const url = require('url');
const validateSignin = require('../utils/validateSignin');
const validateSignup = require('../utils/validateSignup');

router.get('/auth/logout',(req,res)=>{
    req.logout()
    res.redirect('http://localhost:3000/')
})

router.post('/auth/signin',...validateSignin(),signin)

router.post("/auth/signup",...validateSignup(),signup)

router.get('/auth/facebook',
  passport.authenticate('facebook',{ scope : ['email'] }));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    const token= generateToken(req.user)
    // res.cookie('token',token)
    res.redirect(url.format({
        pathname:'https://cameo-frontend.vercel.app/',
        query:{
            "token":token,
            "user":req.user.email
        }
    }))
  });

  module.exports=router