import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        username,
        password,
      });

      // ✅ Save to localStorage
      localStorage.setItem("user", response.data.username);


      // ✅ Redirect to home/dashboard
      navigate("/home");
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div class="register-body">
      <div class="register">
        <div class="login-main">
        <h2 class="register-heading">Login Form</h2>
        <hr class="register-hr" />
    <form class="login-form" onSubmit={handleLogin}>
      <input class="register-input"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br ></br><br />
      <input class="register-input"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />
      <button class="register-btn"  type="submit">Log In</button>
      {/* <button class="register-btn2" onClick={() => navigate('/register')}>Sign In</button> */}
      <p class="register-already">Create a new account?<span class="register-already go-to-register" onClick={() => navigate('/register')}>Go to Register</span></p>
      
    </form>
    </div>
    </div>
    </div>
  );
};

export default Login;
