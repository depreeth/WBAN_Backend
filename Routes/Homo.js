const express = require("express");
const User = require("../models/User");
const TA = require("../models/TAvalues");
const MSP = require("../models/MSPvalues");
const paillier = require("paillier-bigint");
const router = express.Router();
const bodyParser = require("body-parser").json();

router.post("/detection", bodyParser, async (req, res) => {
  const data = req.body;
  // console.log(Object.keys(data).length)
  // console.log("hii")
  const len = Object.keys(data).length;
  const user = await User.findOne({ _id: data.userId });
  const TAvalues = await TA.findOne({ parameter: data.parameter });
  // console.log(TAvalues)
  try {
    const key = user.publicKey;

    const n = BigInt(key.n);
    const g = BigInt(key.g);
    const publicKey = new paillier.PublicKey(n, g);
    let diff;

    // if (len === 3) {
    const encInpVal = publicKey.encrypt(data.value1);
    const encTaVal = publicKey.encrypt(TAvalues.value1);
    // res.status(200).send({"inp":encInpVal.toString(), "ta":encTaVal.toString()})
    const negInp = publicKey.multiply(encInpVal, -1);
    diff = publicKey.addition(encTaVal, negInp);
    // return res.send({ diff: diff.toString() });
    // } else {
    //   for (let i = 2; i < Object.keys(data).length; i++) {}
    //   const inpVal1 = publicKey.encrypt(data.value1);
    //   const inpVal2 = publicKey.encrypt(data.value2);
    //   const taVal1 = publicKey.encrypt(TAvalues.value1);
    //   const taVal2 = publicKey.encrypt(TAvalues.value2);
    //   const negInp1 = publicKey.multiply(inpVal1);
    //   const negInp2 = publicKey.multiply(inpVal2);
    //   const diff1 = publicKey.addition(taVal1, negInp1);
    //   const diff2 = publicKey.addition(taVal2, negInp2);
    //   return res.send({ diff1: diff1.toString(), diff2: diff2.toString() });
    // }

  } catch (error) {
    res.send(error);
  }
});

router.post("/msp/search", bodyParser, async (req, res) => {
  try {
    if (req.body.emergency === false) {
      return res.send("MSP can be searched only in case of emergency");
    }
    const user = await User.findOne({ _id: req.body.userId });
    const msps = await MSP.find({ parameter: req.body.parameter });

    const key = user.publicKey;
    const n = BigInt(key.n);
    const g = BigInt(key.g);
    const publicKey = new paillier.PublicKey(n, g);

    const encInpVal = publicKey.encrypt(req.body.value);
    const negInp = publicKey.multiply(encInpVal, -1);

    let mspValues = [];

    msps.forEach((msp) => {
      let val = publicKey.encrypt(msp.value1);
      mspValues.push(val);
      // console.log(mspValues);
    });

    let diff = [];

    mspValues.forEach((val) => {
      let d = publicKey.addition(val, negInp);
      diff.push(d.toString());
      // console.log(diff);
    });

    res.send(diff);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
