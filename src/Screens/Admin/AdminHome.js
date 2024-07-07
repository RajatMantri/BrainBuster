import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import NotFound from "../../Components/NotFound";
import axios from 'axios';
const AdminHome = () => {
    const type = localStorage.getItem('type');
    const username = localStorage.getItem('username');
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        fetchQuizzes();
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

    console.log(recentQuizzes);

    return (
        <>
            {localStorage.getItem('username') && type === "admin" ? (
                <div>
                    <NavBar type="admin" username={localStorage.getItem('username')} />
                    <div className="jumbotron">
                        <h1><u>Welcome {localStorage.getItem('username')}!</u></h1>
                        <h2>Recent Attempted Quizzes</h2>
                    </div>

                    <div className="features">
                        {
                            recentQuizzes.map((quiz) => (
                            <div className="feature" key={quiz._id}>
                                <a href={`http://localhost:3000/adminHome/quiz/${quiz._id}`}>
                                    <img src="https://static.vecteezy.com/system/resources/previews/005/083/209/non_2x/editable-flat-outline-design-of-quiz-icon-vector.jpg" alt="Feature Image" />
                                    <div className="feature-content">
                                        <h3 className="feature-title">{quiz.title}</h3>
                                        <p className="feature-description">{quiz.description}</p>
                                    </div>
                                </a>
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

export default AdminHome;
