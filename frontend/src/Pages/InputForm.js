import React, { useState } from "react";
// import img from "../assets/signup-bg.jpg";
import { useNavigate } from "react-router-dom";
import {AiFillEyeInvisible,AiFillEye} from 'react-icons/ai'

const InputForm = () => {
  const [id, setId] = useState("");
  const [parameter, setParameter] = useState("");
  const [value, setValue] = useState("");
 

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
      .then(response => console.log(response.body.getReader().read()))
      .then(data => {
console.log("data:",data)
      })
      .catch(error => console.error(error));

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