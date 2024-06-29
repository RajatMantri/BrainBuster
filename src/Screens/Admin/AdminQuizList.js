// AdminQuizList.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotFound from "../../Components/NotFound";

const AdminQuizList = () => {
  const username = localStorage.getItem('username');
  const [quizzes, setQuizzes] = useState([]);
  const type=localStorage.getItem('type');

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/quizzes/show/${username}`);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:4000/api/quizzes/${quizId}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      console.log('Quiz deleted successfully');
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <>
      {localStorage.getItem('username')&&type==="admin" ? (
        <div>
          <div className="quiz-list-container">
            <h2>Quizzes</h2>
            <ul>
              {quizzes.map((quiz) => (
                <li key={quiz._id}>
                  {quiz.title}
                  <div>
                    <button className="delete-btn" onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
                    <Link to={`/adminHome/quiz/${quiz._id}`}><button className="view-btn">View Quiz</button></Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default AdminQuizList;
