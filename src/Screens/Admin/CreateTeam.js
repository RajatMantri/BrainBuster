import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotFound from "../../Components/NotFound";
import { useNavigate } from 'react-router-dom';
import auth from '../../Components/Auth';

const CreateTeam = () => {
  let navigate = useNavigate()
  const [teamName, setTeamName] = useState('');
  const [type, setType] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const userType = await auth();
        setType(userType);
      } catch (error) {
        console.error('Error:', error.message);
        setType(null);
      }
    }

    fetchData();
  }, []);

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
      {type === "admin" ? (
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
        type === undefined ? null : <NotFound />
      )}
    </>
  );
};


export default CreateTeam;