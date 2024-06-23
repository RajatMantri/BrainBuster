import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const TeamDetails = () => {
  const { teamId } = useParams();
  const username = localStorage.getItem('username');

  const [teamInfo, setTeamInfo] = useState({
    teamName: '',
    Code: '',
    Owner: '',
    Students: [],
    Quizzes: []
  });

  useEffect(() => {
    fetchTeamDetails();
  }, []);

  const fetchTeamDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/teams/details/${teamId}`);
      setTeamInfo(response.data);
    } catch (error) {
      console.error('Error fetching team details:', error);
    }
  };

  const handleAddQuiz = async () => {
   
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await axios.delete(`http://localhost:4000/api/quizzes/${quizId}`);
      setTeamInfo(prevState => ({
        ...prevState,
        Quizzes: prevState.Quizzes.filter(quiz => quiz._id !== quizId)
      }));
      console.log('Quiz deleted successfully');
    } catch (error) {
      console.error('Error deleting quiz:', error);
    }
  };

  const handleBootStudent = async (studentId) => {
    try {
      await axios.delete(`http://localhost:4000/api/teams/${teamId}/students/${studentId}`);
      setTeamInfo(prevState => ({
        ...prevState,
        Students: prevState.Students.filter(student => student._id !== studentId)
      }));
      console.log('Student booted successfully');
    } catch (error) {
      console.error('Error booting student:', error);
    }
  };

  const handleAddStudent = async () => {
    // Implement logic to add a student to this team
    // Redirect or show modal form for adding student
  };

  return (
    <div>
      <h2>Team Details</h2>
      <h3>Team Name: {teamInfo.teamName}</h3>
      <p><strong>Team Code:</strong> {teamInfo.Code}</p>
      <p><strong>Owner:</strong> {teamInfo.Owner}</p>

      <div>
        <h3>Students:</h3>
        <ul>
          {teamInfo.Students.map(student => (
            <li key={student._id}>
              {student.name} - {student.email}
              <button style={{ marginLeft: '10px' }} onClick={() => handleBootStudent(student._id)}>Boot</button>
            </li>
          ))}
        </ul>
        <button onClick={handleAddStudent}>Add Student</button>
      </div>

      <div>
        <h3>Quizzes:</h3>
        <button onClick={handleAddQuiz}>Add Quiz</button>
        <ul>
          {teamInfo.Quizzes.map(quiz => (
            <li key={quiz._id}>
              <strong>{quiz.title}</strong>
              <button style={{ backgroundColor: 'red', marginLeft: '10px' }} onClick={() => handleDeleteQuiz(quiz._id)}>Delete Quiz</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeamDetails;
