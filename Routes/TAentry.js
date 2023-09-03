const express = require('express');
const TAvalues = require('../models/TAvalues');
// const paillier = require("paillier-bigint");
const router = express.Router()
const bodyParser = require('body-parser').json();


router.post('/entry',bodyParser, async(req,res)=>{
    const data = req.body
    // const taParams = await 
    const newVal = new TAvalues({
        parameter: data.parameter,
        value1: data.value1,
        value2: data.value2
    })
    const result = await newVal.save()
    res.send(result)
})

module.exports = router