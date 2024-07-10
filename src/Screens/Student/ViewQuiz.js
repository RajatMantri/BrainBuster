import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NotFound from '../../Components/NotFound';
import auth from '../../Components/Auth';
import NoDataFound from '../../Components/NoDataFound';

const ViewQuiz = () => {
  const { teamId } = useParams();
  const [type, setType] = useState(undefined);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const userType = await auth();
        setType(userType);
        fetchQuizzes();
      } catch (error) {
        console.error('Error:', error.message);
        setType(null);
      }
    }

    fetchData();
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
      {type === 'student' ? (
        <div>
          <h2 className="quiz-heading">Quizzes</h2>
          <ul className="view-quiz-list">
            {quizzes.length!==0 && quizzes.map((quiz) => (
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
            {quizzes.length===0 && <NoDataFound/>}
        </div>
      ) : (
        type === undefined ? null : <NotFound />
      )}
    </div>
  );
};

export default ViewQuiz;
