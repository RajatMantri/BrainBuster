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
                <img src="https://thumbs.dreamstime.com/b/male-hand-holding-megaphone-quiz-time-speech-bubble-loudspeaker-banner-business-marketing-advertising-vector-125104939.jpg" alt="Feature Image 1" />
                <div className="feature-content">
                    <h3 className="feature-title">Interactive Quizzes</h3>
                    <p className="feature-description">Engage users with interactive quizzes that test their knowledge.</p>
                </div>
            </div>
            <div className="feature">
                <img src="https://png.pngtree.com/png-clipart/20210309/original/pngtree-practice-makes-a-man-perfect-tshirt-png-image_5839403.jpg" alt="Feature Image 2" />
                <div className="feature-content">
                    <h3 className="feature-title">Retake Quizzes</h3>
                    <p className="feature-description">Retake recent quizzes, correct your mistakes.</p>
                </div>
            </div>
            <div className="feature">
                <img src="https://t3.ftcdn.net/jpg/04/21/44/74/360_F_421447468_CXRbXXka6BdfvmIZju8rezIoGewUQ6BT.jpg" alt="Feature Image 3" />
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