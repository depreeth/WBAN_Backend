const express = require('express');
const MSP = require('../models/MSPvalues');
const bodyParser = require('body-parser').json();
const router = express.Router()

router.post('/add',bodyParser, async(req, res)=>{
    try {
        
        const data = req.body
        const ins = new MSP(data)
        
        const result = await ins.save()
        res.send(result)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router