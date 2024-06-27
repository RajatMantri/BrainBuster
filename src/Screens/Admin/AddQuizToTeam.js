import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotFound from "../../Components/NotFound";

const AddQuizToTeam = () => {
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

  const handleAddQuizToTeam = async (quizId) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/${teamId}/quizzes/${quizId}`);
      console.log(response.data.message);
    } catch (error) {
      console.error('Error adding quiz to team:', error);
    }
  };

  return (
    <>
      {localStorage.getItem('username') ? (
        <div className="add-quiz-container">
          <h2 >Add Quiz to Team</h2>
          <ul className="quiz-list">
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="quiz-item">
                {quiz.title}
                <button style={{backgroundColor:' #4CAF50'}}onClick={() => handleAddQuizToTeam(quiz._id)}>Add to Team</button>
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

export default AddQuizToTeam;
