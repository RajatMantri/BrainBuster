import React, { useState } from "react";
import axios from "axios";
import NotFound from "../../Components/NotFound";
import { useNavigate } from "react-router-dom";

const JoinTeam = () => {
    let navigate=useNavigate();
  const username = localStorage.getItem('username');
  const type = localStorage.getItem('type');
  const [teamName, setTeamName] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

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
      {localStorage.getItem('username') && type === "student" ? (
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
        <NotFound />
      )}
    </>
  );
};

export default JoinTeam;
