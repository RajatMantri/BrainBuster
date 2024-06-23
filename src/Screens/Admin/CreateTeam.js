import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { Link } from 'react-router-dom';
const CreateTeam = () => {
  const [teamName, setTeamName] = useState('');

  const handleTeamChange = (event) => {
    setTeamName(event.target.value);
  };

  const username = localStorage.getItem('username');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        console.log(username);
        console.log(teamName);
        const response = await axios.post('http://localhost:4000/api/createTeam', {teamName,username});
        console.log('Team created successfully');
        setTeamName('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="team-component">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter team name"
          value={teamName}
          onChange={handleTeamChange}
          className="team-input"
        />

<Link to={`/adminHome`}><button type="submit" className="submit-button">Submit</button></Link>
      </form>
    </div>
  );
};

export default CreateTeam;