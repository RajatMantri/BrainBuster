import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NotFound from "../../Components/NotFound";
import auth from "../../Components/Auth";

const Result = () => {
    const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const username = localStorage.getItem('username');
    const [type, setType] = useState(undefined);

    useEffect(() => {
        const fetchAttemptedQuizzes = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/getAttemptedQuizzes/${username}`);
                setAttemptedQuizzes(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching attempted quizzes:', error);
                setLoading(false);
            }
        };

        async function fetchData() {
            try {
                const userType = await auth();
                setType(userType);
                fetchAttemptedQuizzes();
            } catch (error) {
                console.error('Error:', error.message);
                setType(null);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="result-container">
            {type === "student" ? (
                <div>
                    <h2 className="result-heading">Results</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <ul className="quiz-list">
                            {attemptedQuizzes.map((quiz) => (
                                <li key={quiz._id} className="quiz-item">
                                    <span className="quiz-title_r">{quiz.title}</span>
                                    <div className="buttons-container">
                                        <Link to={`/quiz/${quiz.quizId}/result`} className="button-link">
                                            <button style={{ "backgroundColor": "blue" }} className="view-result-button">View Result</button>
                                        </Link>
                                        <Link to={`/quiz/leaderboard/${quiz.quizId}`} className="button-link">
                                            <button style={{ "backgroundColor": "blue" }}
                                                className="leaderboard-button">Leaderboard</button>
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ) : (
                type === undefined ? null : <NotFound />
            )}
        </div>
    );
};

export default Result;
