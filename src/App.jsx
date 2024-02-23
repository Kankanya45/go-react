import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import User from "./components/User";
import Student from "./components/student";
import Teachers from "./components/Teacher";
import SignIn from "./components/SignIn";
import Subject from "./components/subject";
import Footer from "./components/Footer";



function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/User', { replace: true });
    window.location.reload();
  };

  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/login" element={<SignIn onLoginSuccess={handleLogin} />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/User" element={<User />} />
        <Route path="/student" element={<Student />} />
        <Route path="/subject" element={<Subject />} />
        <Route path="/teacher" element={<Teachers />} />
      </Routes>
      <br />
      <br />
      
      <Footer />
      
    </>
    
  );
  
}


export default App;