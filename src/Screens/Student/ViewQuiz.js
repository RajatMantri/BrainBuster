import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NotFound from '../../Components/NotFound';


const ViewQuiz = () => {
  const { teamId } = useParams();
  const username = localStorage.getItem('username');
  const type = localStorage.getItem('type');
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/teams/${teamId}/quizzes`);
      setQuizzes(response.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  return (
    <div className="view-quiz-container">
      {localStorage.getItem('username') && type === 'student' ? (
        <div>
          <h2 className="quiz-heading">Quizzes</h2>
          <ul className="view-quiz-list">
      {quizzes.map((quiz) => (
        <li key={quiz._id} className="view-quiz-item">
          <div className="view-quiz-title-container">
            <strong>{quiz.title}</strong>
          </div>
          <Link to={`/quiz/${quiz._id}/attempt`} className="view-attempt-button-link">
            <button className="view-attempt-button">Attempt Quiz</button>
          </Link>
        </li>
      ))}
    </ul>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default ViewQuiz;
