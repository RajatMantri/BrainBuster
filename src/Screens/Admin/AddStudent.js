import React, { useState } from 'react';
import axios from 'axios';
import NotFound from '../../Components/NotFound';
import { useParams, useNavigate } from 'react-router-dom';

const AddStudent = () => {
  const type=localStorage.getItem('type');
  const  teamId  = useParams().teamId;
  console.log(useParams());
  const navigate = useNavigate();
  console.log("teamId: "+teamId);
  const [username, setusername] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`http://localhost:4000/api/teams/${teamId}/add-student`, { name: username });
        navigate(`/team/manageStudent/${teamId}`); // Redirect to the team page after adding the student
        // console.log("teamId2: "+teamId);
    } catch (error) {
        if(error.response.status===400){
            alert('Student already Added');
        }
        else{
            console.error('Error adding student:', error);
        }
    }
  };

  const handleChange = (e) => {
    setusername(e.target.value);
  };

  return (
    <>
    {localStorage.getItem('username') && type === "admin" ? (
    <div className="add-student-container">
      <h2 className="add-student-heading">Add Student</h2>
      <form className="add-student-form" onSubmit={handleSubmit}>
        <label className="add-student-label">
          Student Name:
          <input type="text" name="username" value={username} onChange={handleChange} className="add-student-input" required />
        </label>
        <div className="add-student-buttons">
          <button type="submit" className="add-student-button">Add Student</button>
          <button type="button" onClick={() => navigate(`/team/manageStudent/${teamId}`)} className="add-student-button cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  ) : (
        <NotFound />
      )}
    </>
  );
};

export default AddStudent;
