import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NotFound from "../../Components/NotFound";
import auth from '../../Components/Auth';

const ViewQuiz = () => {
  const { teamId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [type, setType] = useState(undefined);

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

  const handleRemoveQuiz = async (quizId) => {
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
      {type === "admin" ? (
        <div className="quiz-list-container">
          <h2>Quizzes</h2>
          <Link to={`/quizzes/${teamId}`}><button className="view-btn">Add Quiz</button></Link>
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz._id}>
                {quiz.title}
                <div>
                  <Link to={`/quiz/${quiz._id}`}><button className="view-btn">View Quiz</button></Link>
                  <button className="delete-btn" onClick={() => handleRemoveQuiz(quiz._id)}>Remove Quiz</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        type === undefined ? null : <NotFound />
      )}
    </>
  );
};

export default ViewQuiz;
