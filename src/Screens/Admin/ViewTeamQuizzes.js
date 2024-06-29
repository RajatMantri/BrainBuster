import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NotFound from "../../Components/NotFound";

const ViewQuiz = () => {
  const { teamId } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const type=localStorage.getItem('type');

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
      {localStorage.getItem('username')&&type==="admin" ? (
        <div className="quiz-list-container">
          <h2>Quizzes</h2>
          <Link to={`/quizzes/${teamId}`}><button className="view-btn">Add Quiz</button></Link>
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz._id}>
                  {quiz.title}
                  <div>
                <Link to={`/quiz/${quiz._id}`}><button className="view-btn">View Quiz</button></Link>
                <button className="delete-btn" onClick={() => handleDeleteQuiz(quiz._id)}>Remove Quiz</button>
                </div>
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

export default ViewQuiz;
