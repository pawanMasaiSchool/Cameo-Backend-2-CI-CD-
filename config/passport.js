const passport= require('passport');
const strategy= require("passport-facebook");
const User = require('../models/users.model');
require('dotenv').config()
const FacebookStrategy = strategy.Strategy;

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: 'http://localhost:5000/auth/facebook/callback',
            profileFields: ['id', 'displayName', 'email', 'name','picture.type(large)']
        }, async function(accessToken,refreshToken,profile,cb){
            try{
                const user= await User.findOne({email:profile?._json?.email})
                if(!user){
                    const user = await User.create({
                        email:profile?._json?.email,
                        username:String(profile?._json?.email.split('@')[0]),
                        name:profile?._json?.name,
                        twitter_handle:'',
                        profile_picture:profile?._json?.picture?.data?.url?profile?._json?.picture?.data?.url:'https://t4.ftcdn.net/jpg/02/23/50/73/360_F_223507349_F5RFU3kL6eMt5LijOaMbWLeHUTv165CB.jpg',
                        following:[],
                        orders:{
                            purchased:[],
                            received:[]
                        },
                        role:'user',
                        bio:''
                    })
                    cb(null,user)
                }
                cb(null,user)
            }
            catch(err){
                cb(err,null)
            }
        }
    )
)

module.exports=passport