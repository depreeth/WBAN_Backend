const express = require('express');
const User = require('../models/User');
const crypto = require('crypto');
const router = express.Router()
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser').json();

router.post('/login',bodyParser,(req,res)=>{
    let {email,password}=req.body
    if(email=="" || password == ""){
        res.json({
            status:"FAILURE",
            message:"input fields are empty"
        })
    }
    else{
        User.find({email}).then(result=>{
            if(result){
                const hashedpass = result[0].password
                bcrypt.compare(password,hashedpass).then(data=>{
                    if(data){
                        res.json({
                            status:"Successfull",
                            message:"Logged In Successfully!!",
                            data:result
                        })
                    }
                    else{
                        res.json({
                            status:"FAILURE",
                            message:"no credentials found"
                        })
                    }
                }).catch(err=>{
                    console.log(err)
                    res.json({
                        status:"FAILED",
                        message:"error occured while checking user password"
                    })
                })
            }
        }).catch(err=>{
            console.log(err)
            res.json({
                status:"FAILED",
                message:"error occured while checking user exist or not"
            })
        })
    }
})
function generatePrivateKey() {
    const privateKeyBuffer = crypto.randomBytes(32);

  // Convert the buffer to a hexadecimal string
  const privateKey = privateKeyBuffer.toString('hex');

  return privateKey;
  }

router.post('/signup',bodyParser,(req,res)=>{
    // res.send({msg:"signup done"})
    // let {name,email,password} = req.body;
    let {name,email,password} = req.body;
    
    
    if(name == "" || email == "" || password == ""){
        res.json({
            status:"FAILURE",
            message:"input fields are empty"
        })
    }

    else{
        User.find({email}).then((result)=>{
            if(result.length){
                res.json({
                    status:"FAILED",
                    message:"email already exists!!"
                })
            }
            else{
                const privateKey = generatePrivateKey();
                const saltRounds = 10;
                bcrypt.hash(password,saltRounds).then(hashedpass=>{
                    const newUser = new User({
                        name: name,
                        email: email,
                        password: hashedpass,
                        privateKey
                    })
                    newUser.save().then(result=>{
                        res.json({
                            status:"Successfull",
                            message:"New User Created",
                            data:result
                        })
                    })
                }).catch(err=>{
                    console.log(err)
                    res.json({
                        status:"FAILED",
                        message:"error occured while hashing password!!"
                    })
                })
            }
        }).catch(err=>{
            console.log(err)
            res.json({
                status:"FAILED",
                message:"error occured while checking of existing user!!"
            })
        })
    }
})

module.exports = router