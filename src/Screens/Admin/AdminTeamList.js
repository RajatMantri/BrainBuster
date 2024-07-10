import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotFound from "../../Components/NotFound";
import auth from '../../Components/Auth';
import NoDataFound from '../../Components/NoDataFound';

const TeamList = () => {
  const username = localStorage.getItem('username');
  const [teams, setTeams] = useState([]);
  const [type, setType] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const userType = await auth();
        setType(userType);
        fetchTeams();
      } catch (error) {
        console.error('Error:', error.message);
        setType(null);
      }
    }
    fetchData();
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
      {localStorage.getItem('username') && type === "admin" ? (
        <div className="quiz-list-container">
          <h2>Teams</h2>
          <ul>
            {teams.length!==0 && teams.map((team) => (
              <li key={team._id}>
                <h3>{team.teamName}</h3>
                <div>
                  <button className="delete-btn" onClick={() => handleDeleteTeam(team._id)}>Delete Team</button>
                  <Link to={`/team/manageQuiz/${team._id}`}><button className="view-btn">Manage Quiz</button></Link>
                  <Link to={`/team/manageStudent/${team._id}`}><button className="view-btn">Manage Student</button></Link>
                </div>
              </li>
            ))}

            {teams.length===0 && <NoDataFound/>}
          </ul>
        </div>
      ) : (
        type === undefined ? null : <NotFound />
      )}
    </>
  );
};

export default TeamList;
