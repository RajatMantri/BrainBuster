import React from "react";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";

const Home = (props) => {
    return (<>
        <NavBar type={props.type} />
        <div className="jumbotron">
            <h1>Welcome to our Quizzing Website</h1>
            <p>Engage, Learn, and Have Fun!</p>
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
    </>)
}

export default Home;