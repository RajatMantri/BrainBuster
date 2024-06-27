import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotFound from "../../Components/NotFound";

const TeamList = () => {
  const username = localStorage.getItem('username');
  const [teams, setTeams] = useState([]);

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
      {localStorage.getItem('username') ? (
        <div className="team-list-container">
          <h2>Teams associated with {username}</h2>
          <ul>
            {teams.map((team) => (
              <li key={team._id} className="team-item">
                <h3>Team Name: {team.teamName}</h3>
                <p><strong>Team Code:</strong> {team.Code}</p>
                <p><strong>Owner:</strong> {team.Owner}</p>
                <p><strong>Students:</strong> {team.Students.join(', ')}</p>
                <div>
                  <button className="team-item-buttons_r" onClick={() => handleDeleteTeam(team._id)}>Delete Team</button>
                  <Link to={`/team/${team._id}`}><button className="team-item-buttons">View Quiz</button></Link>
                  <Link to={`/quizzes/${team._id}`}><button className="team-item-buttons">Add Quiz</button></Link>
                  <Link to={`/quizzes/delete/${team._id}`}><button className="team-item-buttons_r">Delete Quiz</button></Link>
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
