import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import NotFound from "../../Components/NotFound";

const DeleteQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { teamId } = useParams();
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/quizzes/`);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:4000/api/teams/${teamId}/quizzes/${quizId}`);
      setQuizzes(quizzes.filter((quiz) => quiz._id !== quizId));
      console.log('Quiz deleted successfully');
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  return (
    <>
      {localStorage.getItem('username') ? (
        <div className="delete-quiz-container">
          <h2>Quizzes created by {username}</h2>
          <ul className="quiz-list">
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="quiz-item">
                <Link to={`/quiz/${quiz._id}`}>
                  <strong>Title:</strong> {quiz.title}
                </Link>
                <button onClick={() => handleDeleteQuiz(quiz._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default DeleteQuiz;
