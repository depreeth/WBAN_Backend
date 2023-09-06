import React, { useState } from "react";
// import img from "../assets/signup-bg.jpg";
import { useNavigate } from "react-router-dom";
import paillier from "paillier-bigint"
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'

const InputForm = () => {
  const [id, setId] = useState("");
  const [parameter, setParameter] = useState("");
  const [value, setValue] = useState("");
  const [diff, setDiff] = useState("");
 
  const x = BigInt(746)

  const navigate = useNavigate ();

  const handleSubmit = (event) => {
    event.preventDefault();


    const userObject = {
        userId: id,
        parameter: parameter,
        value1: value
      };
    // Make HTTP request to server-side endpoint to authenticate user
    fetch('http://127.0.0.1:4000/api/homo/detection', {
      method: 'POST',
      body: JSON.stringify(userObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((prom)=>{
        prom.json()
        .then((j)=>{
          // console.log(j)
          setDiff(j)
        })
        .catch((e)=>{
          console.log("ee",e)
        })
      })
      .catch(error => console.error(error));


      const pvt = "eyJsYW1iZGEiOiI1OTIyMDU5ODA3OTkxNjg1MTQ4IiwibXUiOiIxMjY1NDI2MDA3OTgyODQ5NjQiLCJfcCI6IjUxNjUyNDkzOTkiLCJfcSI6IjIyOTMwMzkyNTMiLCJwdWJsaWNLZXkiOnsibiI6IjExODQ0MTE5NjIzNDQxNjU4OTQ3IiwiX24yIjoiMTQwMjgzMTY5NjU0Mzk1Nzg0OTMwODY3NDk2NTg3NDY1MTQ4ODA5IiwiZyI6IjgzMzk5MTQ4MTUwNTgwMzQxNDQzODgzMzk0MjUxMjA3NjEyNzY5In19"

      // const pubStr = atob(pub)
      // const pubJSON = JSON.parse(pubStr)
      // const publicKey = new paillier.PublicKey(BigInt(pubJSON.n), BigInt(pubJSON.g))

      // const pvtStr = atob(pvt)
      // const pvtJSON = JSON.parse(pvtStr)
      // const publicKey = new paillier.PublicKey(BigInt(pvtJSON.publicKey.n), BigInt(pvtJSON.publicKey.g))
      
      // const privateKey = new paillier.PrivateKey(BigInt(pvtJSON.lambda),BigInt(pvtJSON.mu),publicKey, BigInt(pvtJSON._p), BigInt(pvtJSON._q))
      // console.log("pvt",privateKey)

  }

  console.log("id:",id)
  console.log("para:",parameter)
  console.log("val:",value)

  return (
    <div className=" flex justify-center items-center  h-screen w-full">

      <div className=" bg-gray-100 flex flex-col justify-center rounded-lg">
        <form
          //   action="/home"
          onSubmit={handleSubmit}
          className=" max-w-[400px] border w-full mx-auto bg-white p-4 rounded-xl"
        >
          <h2 className=" text-4xl text-center font-bold py-6">FORM</h2>
          <div className=" flex flex-col py-2">
            <label htmlFor="username">ID</label>
            <input
              className=" border p-2"
              type="text"
              id="id"
              value={id}
              onChange={(event) => setId(event.target.value)}
            />
          </div>
          <div className=" flex flex-col py-2">
            <label htmlFor="username">Parameter</label>
            <input
              className=" border p-2"
              type="text"
              id="username"
              value={parameter}
              onChange={(event) => setParameter(event.target.value)}
            />
          </div>
          <div className=" flex flex-col py-2">
            <label htmlFor="username">Value</label>
            <input
              className=" border p-2"
              type="text"
              id="value"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </div>
          <button className=" border w-full my-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputForm;