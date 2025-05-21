import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const user = localStorage.getItem("username");

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
    <div>
      <h2>Welcome, {user}</h2>

      {/* Ask Question & Logout */}
      <Link to="/ask">
        <button style={{ marginRight: "10px" }}>Ask Question</button>
      </Link>
      <button onClick={handleLogout}>Logout</button>

      <h3>All Questions</h3>
      <ul>
        {questions.map((question) => (
          <div key={question.id} style={{ marginBottom: '20px' }}>
            <h3>{question.title}</h3>
            <p>{question.description}</p>
            <small>Asked by: {question.username}</small>
            <br />
            <Link to={`/answer/${question.id}`}>
              <button style={{ marginTop: '5px' }}>Answers</button>
            </Link>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Home;
