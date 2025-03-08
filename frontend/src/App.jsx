import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';


const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Login />} />
      </Routes>
    </Router>
    
  )
}

export default App