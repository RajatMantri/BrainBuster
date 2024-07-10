import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFound from '../../Components/NotFound';
import auth from '../../Components/Auth';

const LeaderBoard = () => {
    const [type, setType] = useState(undefined);
    const { quizId } = useParams();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/leaderboard/${quizId}`);
                setLeaderboardData(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error fetching leaderboard data');
                setLoading(false);
            }
        };
        async function fetchData() {
            try {
                const userType = await auth();
                setType(userType);
                fetchLeaderboardData();
            } catch (error) {
                console.error('Error:', error.message);
                setType(null);
            }
        }

        fetchData();
    }, []);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}m ${remainingSeconds}s`;
      }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="leaderboard-container">
            {(type === 'student' || type === 'admin') ? (
                <div>
                    <h2 className="leaderboard-heading">Leaderboard</h2>
                    <div className="table-container">
                        <table className="leaderboard-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Username</th>
                                    <th>Score</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.map((response, index) => (
                                    <tr key={response._id}>
                                        <td>{index + 1}</td>
                                        <td>{response.username}</td>
                                        <td>{response.score}</td>
                                        <td>{formatTime(response.timeTaken)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                type === undefined ? null : <NotFound />
            )}
        </div>
    );
};

export default LeaderBoard;
