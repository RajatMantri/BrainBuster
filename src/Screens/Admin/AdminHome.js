import React from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";
import NotFound from "../../Components/NotFound";

const AdminHome = () => {
    const type=localStorage.getItem('type');
    const recentQuizzes = [
        { name: "Quiz 1", score: 80 },
        { name: "Quiz 2", score: 75 },
        { name: "Quiz 3", score: 90 }
    ];

    return (
        <>
            {localStorage.getItem('username')&&type==="admin" ? (
                <div>
                    <NavBar type="admin" username={localStorage.getItem('username')} />
                    <div className="jumbotron">
                        <h1><u>Welcome {localStorage.getItem('username')}!</u></h1>
                    </div>

                    <div className="features">
                        <div className="feature">
                            <img src="https://via.placeholder.com/200" alt="Feature Image 1" />
                            <div className="feature-content">
                                <h3 className="feature-title">Interactive Quizzes</h3>
                                <p className="feature-description">Engage users with interactive quizzes that test their knowledge.</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="https://via.placeholder.com/200" alt="Feature Image 2" />
                            <div className="feature-content">
                                <h3 className="feature-title">Customizable Themes</h3>
                                <p className="feature-description">Choose from a variety of themes to customize the appearance of quizzes.</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="https://via.placeholder.com/200" alt="Feature Image 3" />
                            <div className="feature-content">
                                <h3 className="feature-title">Leaderboards</h3>
                                <p className="feature-description">Track users' performance and display top scores on leaderboards.</p>
                            </div>
                        </div>
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
