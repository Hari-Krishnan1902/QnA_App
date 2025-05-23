import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CiUser } from "react-icons/ci";

const Answer = () => {
  const { id } = useParams(); // question ID from URL
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const user = localStorage.getItem("user");

  // Fetch question
  useEffect(() => {
    axios.get(`http://localhost:8080/api/questions/${id}`)
      .then(res => setQuestion(res.data))
      .catch(err => console.error("Failed to fetch question", err));
  }, [id]);

  // Fetch answers
  useEffect(() => {
    axios.get(`http://localhost:8080/api/answers/question/${id}`)
      .then(res => setAnswers(res.data))
      .catch(err => console.error("Failed to fetch answers", err));
  }, [id]);
    const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  // Submit new answer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      await axios.post("http://localhost:8080/api/answers/post", {
        content: newAnswer,
        questionId: id,
        username: user
      });

      setNewAnswer("");
      // Refresh answers after posting
      const res = await axios.get(`http://localhost:8080/api/answers/question/${id}`);
      setAnswers(res.data);
    } catch (error) {
      console.error("Error posting answer", error);
    }
  };

  return (
    <div  class="answer-container">
       <header class="home-header">
          <p class="home-brand">ASKIFY</p>
          <div class="home-profile">
              <h2>Welcome, {user}</h2>
              <button class="home-logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </header>
      {question ? (
        <div>
          <div class="answer-header-div">
              <div class="answer-header-tag">
                <span class="answer-header-h3">{question.title}</span>
                <small class="answer-small"><CiUser class="icon" /> {question.user}</small>
              </div>
               <h3 class="home-ans-heading">Question</h3>
              <p class="answer-header-p">{question.description}</p>
          </div>
          
          <h3 class="home-ans-heading ans-head">Answers</h3>
          <div class="answer">
               {answers.length > 0 ? (
               <ul class="answer-ul">
                {answers.map((ans) => (
                <li key={ans.id} class="answer-li">
                  <small class="answer-small"><CiUser class="icon" />{ans.user?.username || "Unknown"}</small>
                  <p class="answer-p">{ans.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No answers yet.</p>
          )}
          </div>
        <div className="your-ans">
            <h3>Your Answer</h3>
          <form onSubmit={handleSubmit} class="answer-form">
            <textarea class="ask-input ans-input"
              rows="4"
              cols="50"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Type your answer..."
              required
            />
            <br />
            <button type="submit"  class="home-logout-btn">Post Answer</button>
          </form>
        </div>
          
            
        </div>

      ) : (
        <p>Loading question...</p>
      )}
       <footer class="home-footer">
      <p>&copy; 2025 Clarify Me. All rights reserved.</p>
    </footer>
      
    
    </div>
    
    
  );
};

export default Answer;
