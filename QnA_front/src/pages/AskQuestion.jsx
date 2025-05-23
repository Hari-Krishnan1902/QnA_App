import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AskQuestion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

   
  const user = localStorage.getItem("user");
  const loggedInUsername = user;

    if (!loggedInUsername) {
      alert("User not logged in. Please login first.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/questions/ask", {
        title: title,
        description: description,
        username: loggedInUsername,
      });

      console.log("Question posted:", response.data);
      alert("Question posted successfully!");
      setTitle("");
      setDescription("");

      // navigate('/'); 
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to post question. Please try again.");
    }
  };

  return (
    <div class="ask-container">
      <h2>Ask a Question</h2>
      <form class="ask-form" onSubmit={handleSubmit}>
        <input class="ask-input"
          type="text"
          placeholder="Enter question title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <input class="ask-input ask-input-question"
          placeholder="Enter question description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />
        <button class="home-logout-btn ask-submit" type="submit">Submit Question</button>
      </form>
    </div>
  );
};

export default AskQuestion;
