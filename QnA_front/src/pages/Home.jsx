import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AskQuestion from './AskQuestion';
import { CiUser } from "react-icons/ci";

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const user = localStorage.getItem("user");

  useEffect(() => {
    axios.get('http://localhost:8080/api/questions')
      .then(res => {
        setQuestions(res.data);
      })
      .catch(err => {
        console.error("Failed to fetch questions", err);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div class="home-body">
      <div class="home-container">
        <header class="home-header">
          <p class="home-brand">ASKIFY</p>
          <div className="home-profile">
              <h2>Welcome, {user}</h2>
              <button class="home-logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </header>
      {/* Ask Question & Logout */}
      {/* <Link to="/ask">
        <button style={{ marginRight: "10px" }}>Ask Question</button>
      </Link> */}
      
      <AskQuestion />
      <h3 class="home-ans-heading">All Questions</h3>
      <ul class="home-qnlist">
        {questions.map((question) => (
          <div class="home-qnlist-div" key={question.id}>
           <div class="home-qnlist-header">
             <h3 class="home-qnlist-h3">{question.title} </h3>
              <small ><CiUser class="icon" />{question.username}</small>
            </div>
             
            <p class="home-qnlist-p">{question.description}</p>
           
            <br />
            <Link to={`/answer/${question.id}`}>
              <button class="home-logout-btn">Answers</button>
            </Link>
          </div>
        ))}
      </ul>
    </div>
    <footer class="home-footer">
      <p>&copy; 2025 Clarify Me. All rights reserved.</p>
    </footer>

    </div>
  );
};

export default Home;
