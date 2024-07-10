import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NotFound from '../../Components/NotFound';
import auth from '../../Components/Auth';

const PreviousTeamStudent = () => {
    const username = localStorage.getItem('username');
    const [teams, setTeams] = useState([]);
    const [type, setType] = useState(undefined);

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/student/${username}/quizzes`);
                setTeams(response.data);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };

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
    return (
        <>
            {type === "student" ? (
                <div className="previousTeamStudentContainer">
                    <div>
                        <h2 className="previousTeamStudentHeading">Teams </h2>
                        <ul className="previousTeamStudentList">
                            {teams.map((team) => (
                                <li key={team._id} className="previousTeamStudentItem">
                                    <h3>{team.teamName}</h3>
                                    <Link to={`/team/student/${team._id}`}>
                                        <button>View Quiz</button>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                type === undefined ? null : <NotFound />
            )}
        </>
    );
};

export default PreviousTeamStudent;
