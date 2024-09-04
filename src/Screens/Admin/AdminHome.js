import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import NotFound from "../../Components/NotFound";
import auth from "../../Components/Auth";
import axios from 'axios';
import NoDataFound from "../../Components/NoDataFound";
import {Link} from 'react-router-dom';

const AdminHome = () => {
    const [type, setType] = useState(undefined);
    const username = localStorage.getItem('username');
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const userType = await auth();
                setType(userType);
                fetchQuizzes();
            } catch (error) {
                console.error('Error:', error.message);
                setType(null);
            }
        }

        fetchData();
    }, []);

    const fetchQuizzes = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/quizzes/show/${username}`);
            setQuizzes(response.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        }
    };

    let recentQuizzes = [];
    if (quizzes.length >= 3) {
        recentQuizzes = quizzes.slice(-3).reverse();
    } else if (quizzes.length === 2) {
        recentQuizzes = quizzes.slice(-2).reverse();
    } else {
        recentQuizzes = quizzes;
    }

    return (
        <>
            {type === "admin" ? (
                <div>
                    <NavBar type="admin" username={username} />
                    <div className="jumbotron">
                        <h1><u>Welcome {username}!</u></h1>
                        <h2>Recently Created Quizzes</h2>
                    </div>

                    <div className="features">
                        {recentQuizzes.length!==0 &&
                            recentQuizzes.map((quiz) => (
                                <div className="feature" key={quiz._id}>
                                    <Link to={`/adminHome/quiz/${quiz._id}`}>
                                        <img src="https://static.vecteezy.com/system/resources/previews/005/083/209/non_2x/editable-flat-outline-design-of-quiz-icon-vector.jpg" alt="Feature Image" />
                                        <div className="feature-content">
                                            <h3 className="feature-title">{quiz.title}</h3>
                                            <p className="feature-description">{quiz.description}</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}

                        {recentQuizzes.length===0 &&
                         <NoDataFound />
                        }
                    </div>
                    <Footer />
                </div>
            ) : (
                type === undefined ? null : <NotFound />
            )}
        </>
    );
};

export default AdminHome;
