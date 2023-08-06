require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

const userRoutes = require('./Routes/User')

app.use('/api/user',userRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  app.listen(process.env.PORT,()=>{
    console.log("Running at port ",process.env.PORT)
  })
})
.catch((error)=>{
  console.log(error)
})

