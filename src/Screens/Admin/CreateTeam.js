import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import NotFound from "../../Components/NotFound";
import { useNavigate } from 'react-router-dom';


const CreateTeam = () => {
  let navigate = useNavigate()
  const [teamName, setTeamName] = useState('');
  const type=localStorage.getItem('type');

  const handleTeamChange = (event) => {
    setTeamName(event.target.value);
  };

  const username = localStorage.getItem('username');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/createTeam', { teamName, username });
      console.log('Team created successfully');
      setTeamName('');
      navigate('/adminHome');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      {localStorage.getItem('username')&&type==="admin" ? (
        <div>
          <div className="team-component">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter team name"
                value={teamName}
                onChange={handleTeamChange}
                className="team-input"
              />

              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};


export default CreateTeam;