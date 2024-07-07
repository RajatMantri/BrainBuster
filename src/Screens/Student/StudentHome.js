import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import NotFound from "../../Components/NotFound";
import axios from "axios";

const StudentHome = () => {
    const [attemptedQuizzes, setAttemptedQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const username = localStorage.getItem('username');
    const type = localStorage.getItem('type');

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

        fetchAttemptedQuizzes();
    }, [username]);

    let recentQuizzes = [];
    if (attemptedQuizzes.length >= 3) {
        recentQuizzes = attemptedQuizzes.slice(-3).reverse();
    } else if (attemptedQuizzes.length === 2) {
        recentQuizzes = attemptedQuizzes.slice(-2).reverse();
    } else {
        recentQuizzes = attemptedQuizzes;
    }

    return (
        <>
            {localStorage.getItem('username') && type === "student" ? (
                <div>
                    <NavBar type="student" username={localStorage.getItem('username')} />
                    <div className="jumbotron">
                        <h1><u>Welcome {localStorage.getItem('username')}!</u></h1>
                        <h2>Recent Attempted Quizzes</h2>
                    </div>
                    <div className="features">
                        {attemptedQuizzes.map((data) => (
                            <div className="feature" key={data._id}>
                                <img src="https://static.vecteezy.com/system/resources/previews/005/083/209/non_2x/editable-flat-outline-design-of-quiz-icon-vector.jpg" alt="Feature Image 1" />
                                <div className="feature-content">
                                    <Link to={`/quiz/${data.quizId}/attempt`}><button>Retake Quiz</button></Link>
                                    <br />
                                    <Link to={`/quiz/${data.quizId}/result`}><button>See Result</button></Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Footer />
                </div>
            ) : (
                <NotFound />
            )}
        </>
    );
};

export default StudentHome;
