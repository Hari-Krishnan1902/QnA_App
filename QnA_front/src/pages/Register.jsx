import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate=useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/users/register", {
        username,
        password,
      });
      setMessage("✅ Registered successfully!!");
      setUsername("");
      setPassword("");
      localStorage.setItem("user",  username ); 
      navigate("/home");
    } catch (error) {
      setMessage("❌ Registration failed!!" + error.response.data);
    }
  };
  return (
    <div className="register-body">
      <div className="register">
        <div className="register-main">
          <h2 className="register-heading">Register Form</h2>
          <hr className="register-hr" />
          <form className="register-form" onSubmit={handleRegister}>
            <input className="register-input"
              type="text"
              placeholder="Username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            /><br /><br />
            <input className="register-input"
              type="password"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            /><br /><br />
            <button className="register-btn" type="submit">Sign In</button>
            {/* <button className="register-btn2" onClick={() => navigate('/login')}>Login</button> */}
          </form>
          <p className="register-response-message">{message}</p>
          <p className="register-already">Already have an account?<span className="register-already go-to-register" onClick={() => navigate('/login')}>Go to Login</span></p>
        </div>
      </div>  
    </div>
  );
}
export default Register;
