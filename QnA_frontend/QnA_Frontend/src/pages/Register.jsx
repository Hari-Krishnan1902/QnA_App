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
      setMessage("✅ Registered successfully!");
      setUsername("");
      setPassword("");
     localStorage.setItem("user", JSON.stringify({ username })); 

      navigate("/home");
    } catch (error) {
      setMessage("❌ Registration failed: " + error.response.data);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>

      <p>Already registered?</p>
      <button onClick={() => navigate('/login')}>Go to Login</button>
    </div>
  );
}

export default Register;
