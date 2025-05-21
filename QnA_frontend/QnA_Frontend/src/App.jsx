import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AskQuestion from './pages/AskQuestion';
import Answer from './pages/Answer';

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/ask" element={user ? <AskQuestion /> : <Navigate to="/login" />} /> */}
        <Route path="/ask" element={<AskQuestion />} />
        <Route path="/answer/:id" element={<Answer />} />
      </Routes>
    </Router>
  );
}

export default App;
