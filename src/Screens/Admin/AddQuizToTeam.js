import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotFound from "../../Components/NotFound";
import auth from '../../Components/Auth';
import NoDataFound from '../../Components/NoDataFound';

const AddQuizToTeam = () => {
  const [quizzes, setQuizzes] = useState([]);
  const teamId = useParams().teamId;
  const [type, setType] = useState(undefined);
  const username = localStorage.getItem('username');

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
      const response = await axios.get(`http://localhost:4000/api/quizzes/show/${username}/${teamId}`);
      setQuizzes(response.data.quizzes);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const handleAddQuizToTeam = async (quizId) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/${teamId}/quizzes/${quizId}`);
      console.log(response.data.message); 

      setQuizzes(prevQuizzes => prevQuizzes.filter(quiz => quiz._id !== quizId));
    } catch (error) {
      console.error('Error adding quiz to team:', error);
    }
  };

  return (
    <>
      {type === "admin" ? (
        <div className="add-quiz-container">
          <h2>Add Quiz to Team</h2>
          <ul className="quiz-list">
            {quizzes.length!==0 && quizzes.map((quiz) => (
              <li key={quiz._id} className="quiz-item">
                {quiz.title}
                <button style={{ backgroundColor: '#4CAF50' }} onClick={() => handleAddQuizToTeam(quiz._id)}>Add to Team</button>
              </li>
            ))}

            {quizzes.length===0 && <NoDataFound/>}
          </ul>
        </div>
      ) : (
        type === undefined ? null : <NotFound />
      )}
    </>
  );
};

export default AddQuizToTeam;
