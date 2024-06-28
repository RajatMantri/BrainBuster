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
          <ul className="quiz-list">
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="quiz-item">
                <strong>Title:</strong> {quiz.title}
                {/* Add a button to attempt the quiz */}
                <Link to={`/quiz/${quiz._id}/attempt`} className="attempt-button">
                  <button style={{"backgroundColor":"Blue"}}>Attempt Quiz</button>
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
