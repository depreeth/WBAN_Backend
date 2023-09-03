import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import InputForm from "./Pages/InputForm";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route exact path="/login" element={<Login/>} />
      <Route exact path="/signup" element={<Signup/>} />
      <Route exact path="/form" element={<InputForm/>} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
