import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NotFound from '../../Components/NotFound';

const LeaderBoard = () => {
    const username = localStorage.getItem('username');
    const type = localStorage.getItem('type');
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

        fetchLeaderboardData();
    }, [quizId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="leaderboard-container">
            {localStorage.getItem('username') && type === 'student' ? (
                <div>
                    <h2 className="leaderboard-heading">Leaderboard</h2>
                    <div className="table-container">
                        <table className="leaderboard-table">
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Username</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboardData.map((response, index) => (
                                    <tr key={response._id}>
                                        <td>{index + 1}</td>
                                        <td>{response.username}</td>
                                        <td>{response.score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default LeaderBoard;
