const express= require('express')
const app= express()
const cors= require('cors')
const PORT= process.env.PORT || 5000
const connect= require('./config/db')
const celebRouter= require('./routes/celebrities.routes')
const authRouter= require('./routes/auth.routes')
const passport= require('./config/passport')
const userRouter= require('./routes/user.route')
const orderRouter = require('./routes/order.routes')
const adminRouter = require('./routes/admin.routes')

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true
    })
  )
app.use(express.json())
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/',authRouter)
app.use('/',celebRouter)
app.use('/',userRouter)
app.use('/',orderRouter)
app.use('/',adminRouter);
app.get('/',(req,res)=>{
  res.status(200).send('Hello')
})
const start= async ()=>{
    await connect()
    console.log('connected to mongo')
    app.listen(PORT,(req,res)=>{
        console.log('listening on port',PORT)
    })
}
module.exports= start