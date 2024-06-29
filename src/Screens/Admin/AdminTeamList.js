import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotFound from "../../Components/NotFound";

const TeamList = () => {
  const username = localStorage.getItem('username');
  const [teams, setTeams] = useState([]);
  const type=localStorage.getItem('type');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/teams/${username}`);
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      await axios.delete(`http://localhost:4000/api/teams/${teamId}`);
      setTeams(teams.filter((team) => team._id !== teamId));
      console.log('Team deleted successfully');
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  return (
    <>
      {localStorage.getItem('username')&&type==="admin" ? (
        <div className="quiz-list-container">
          <h2>Teams</h2>
          <ul>
            {teams.map((team) => (
              <li key={team._id}>
                <h3>{team.teamName}</h3>
                <div>
                  <button className="delete-btn" onClick={() => handleDeleteTeam(team._id)}>Delete Team</button>
                    <Link to={`/team/${team._id}`}><button className="view-btn">Manage Quiz</button></Link>
                    <Link to={`/team/manageStudent/${team._id}`}><button className="view-btn">Manage Student</button></Link>
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

export default TeamList;
