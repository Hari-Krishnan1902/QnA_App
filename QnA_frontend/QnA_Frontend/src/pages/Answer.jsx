import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Answer = () => {
  const { id } = useParams(); // question ID from URL
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newAnswer, setNewAnswer] = useState('');
  const username = localStorage.getItem("username");

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

  // Submit new answer
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      await axios.post("http://localhost:8080/api/answers/post", {
        content: newAnswer,
        questionId: id,
        username: username
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
    <div style={{ padding: '20px' }}>
      {question ? (
        <div>
          <h2>{question.title}</h2>
          <p>{question.description}</p>
          <small>Asked by: {question.user?.username || 'Unknown'}</small>

          <hr />
          <h3>Answers</h3>
          {answers.length > 0 ? (
            <ul>
              {answers.map((ans) => (
                <li key={ans.id} style={{ marginBottom: '10px' }}>
                  <p>{ans.content}</p>
                  <small>Answered by: {ans.user?.username || "Unknown"}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No answers yet.</p>
          )}

          <hr />
          <h3>Your Answer</h3>
          <form onSubmit={handleSubmit}>
            <textarea
              rows="4"
              cols="50"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Type your answer..."
              required
            />
            <br />
            <button type="submit">Post Answer</button>
          </form>
        </div>
      ) : (
        <p>Loading question...</p>
      )}
    </div>
  );
};

export default Answer;
