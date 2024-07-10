import React, { useState, useEffect } from "react";
import axios from "axios";
import NotFound from "../../Components/NotFound";
import { useNavigate } from "react-router-dom";
import auth from "../../Components/Auth";

const JoinTeam = () => {
  let navigate = useNavigate();
  const username = localStorage.getItem('username');
  const [type, setType] = useState(undefined);
  const [teamName, setTeamName] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4000/api/joinTeam/${username}`, {
        teamName,
        code,
      });
      if (response.status === 200) {
        alert("Successfully joined the team!");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) alert("Already Joined to the team");
      else {
        alert("Failed to join the team.");
        console.error("Error:", error);
      }
    }
    navigate('/studentHome');
  };

  return (
    <>
      {type === "student" ? (
        <div className="joinTeamContainer">
          <div className="joinTeamForm">
            <h2 className="joinTeamHeading">Join a Team</h2>
            <form onSubmit={handleSubmit} className="joinTeamForm">
              <div className="joinTeamInputWrapper">
                <label htmlFor="teamName" className="joinTeamLabel">Team Name:</label>
                <input
                  type="text"
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="joinTeamInput"
                  placeholder="Enter team name"
                  required
                />
              </div>
              <div className="joinTeamInputWrapper">
                <label htmlFor="code" className="joinTeamLabel">Code:</label>
                <input
                  type="text"
                  id="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="joinTeamInput"
                  placeholder="Enter team code"
                  required
                />
              </div>
              <button type="submit" className="joinTeamButton">Join</button>
            </form>
            {message && <p className="joinTeamMessage">{message}</p>}
          </div>
        </div>
      ) : (
        type === undefined ? null : <NotFound />
      )}
    </>
  );
};

export default JoinTeam;
