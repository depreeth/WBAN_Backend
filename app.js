require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
var cors = require('cors')


const userRoutes = require('./Routes/User')
const TARoutes = require('./Routes/TAentry')
const homoRoutes = require('./Routes/Homo')
const mspRoutes = require('./Routes/MSP')

app.use(cors())
app.use('/api/user',userRoutes)
app.use('/api/TA',TARoutes)
app.use('/api/homo',homoRoutes)
app.use('/api/msp',mspRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log("Running at port ",process.env.PORT)
  })
})
.catch((error)=>{
  console.log(error)
})

