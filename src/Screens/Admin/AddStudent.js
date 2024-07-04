import React, { useState } from 'react';
import axios from 'axios';
import NotFound from '../../Components/NotFound';
import { useParams, useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const [username, setUsername] = useState('');
  const { teamId } = useParams();
  const navigate = useNavigate();

  const type = localStorage.getItem('type');
  const loggedInUsername = localStorage.getItem('username');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4000/api/teams/${teamId}/add-student`, { name: username });
      alert("Student added to team successfully");
      navigate(`/team/manageStudent/${teamId}`); // Redirect to the team page after adding the student
    } catch (error) {
      if (error.response && error.response.status === 400) {
        let a = (error.response.data.error);
        alert(a);
      } else {
        console.error('Error adding student:', error);
        alert('Failed to add student. Please try again later.');
      }
    }
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  // Redirect to NotFound component if user is not logged in or is not an admin
  if (!loggedInUsername || type !== 'admin') {
    return <NotFound />;
  }

  return (
    <div className="add-student-container">
      <h2 className="add-student-heading">Add Student</h2>
      <form className="add-student-form" onSubmit={handleSubmit}>
        <label className="add-student-label">
          Student Name:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}
            className="add-student-input"
            required
          />
        </label>
        <div className="add-student-buttons">
          <button type="submit" className="add-student-button">
            Add Student
          </button>
          <button
            type="button"
            onClick={() => navigate(`/team/manageStudent/${teamId}`)}
            className="add-student-button cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
