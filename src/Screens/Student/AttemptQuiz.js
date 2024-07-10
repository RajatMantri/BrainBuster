import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotFound from '../../Components/NotFound';
import { useNavigate } from 'react-router-dom';
import auth from '../../Components/Auth';

const AttemptQuiz = () => {
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isQuizSubmitted, setQuizSubmitted] = useState(false);
    let timerInterval = null;
    const username = localStorage.getItem('username');
    const [type, setType] = useState(undefined);
    const nav = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const userType = await auth();
                setType(userType);
            } catch (error) {
                console.error('Error:', error.message);
                setType(null);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        fetchQuiz();
        const storedRemainingTime = localStorage.getItem('remainingTime');
        if (storedRemainingTime) {
            setRemainingTime(parseInt(storedRemainingTime));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('remainingTime', remainingTime.toString());
        if (remainingTime <= 0 && quiz && !isQuizSubmitted) {
            clearInterval(timerInterval);
            handleSubmit();
        }
    }, [remainingTime]);

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/quiz/${quizId}`);
            setQuiz(response.data);

            const initialTime = response.data.duration * 60 || 0;
            setRemainingTime(prev => prev === 0 ? initialTime : prev);

            timerInterval = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timerInterval);
                        return 0;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
        } catch (error) {
            console.error('Error fetching quiz:', error);
        }
    };

    const handleAnswerSelection = (questionId, selectedOption) => {
        setQuiz(prevQuiz => {
            const updatedQuestions = prevQuiz.questions.map(question => {
                if (question._id === questionId) {
                    return { ...question, selectedAnswer: selectedOption };
                }
                return question;
            });
            return { ...prevQuiz, questions: updatedQuestions };
        });
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`http://localhost:4000/api/SaveResponse/${quizId}/${username}`, {quiz: quiz,duration: quiz.duration,time: localStorage.getItem('remainingTime')});
            setQuizSubmitted(true); 
            nav('/studentHome');
            localStorage.removeItem('remainingTime');
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div className="attempt-quiz-container">
            {type === "student" ? (
                <div>
                    <h2 className="quiz-title_f">{quiz.title}</h2>
                    <p className="timer">Time Remaining: {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? `0${remainingTime % 60}` : remainingTime % 60}</p>
                    <h3 className="questions-heading">Questions:</h3>
                    <ol className="questions-list">
                        {quiz.questions.map((question) => (
                            <li key={question._id} className="question-item">
                                <h4 className="question-title">{question.title}</h4>
                                <p className="question-type">Type: {question.type}</p>
                                {question.type === 'multipleChoice' && (
                                    <ul className="options-list">
                                        {question.options.map((option, index) => (
                                            <li key={option} className="option-item">
                                                <input
                                                    type="radio"
                                                    name={`question-${question._id}`}
                                                    value={index}
                                                    onChange={(e) => handleAnswerSelection(question._id, e.target.value)}
                                                />
                                                <span className="option-text">{option}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                                {question.type === 'trueFalse' && (
                                    <div className="truefalse-options">
                                        <input
                                            type="radio"
                                            name={`question-${question._id}`}
                                            value="true"
                                            onChange={(e) => handleAnswerSelection(question._id, e.target.value)}
                                        />
                                        <span className="option-text">True</span>
                                        <input
                                            type="radio"
                                            name={`question-${question._id}`}
                                            value="false"
                                            onChange={(e) => handleAnswerSelection(question._id, e.target.value)}
                                        />
                                        <span className="option-text">False</span>
                                    </div>
                                )}
                                {question.type === 'paragraph' && (
                                    <textarea
                                        rows="4"
                                        cols="50"
                                        className="paragraph-answer"
                                        placeholder="Type your answer here..."
                                        onChange={(e) => handleAnswerSelection(question._id, e.target.value)}
                                    ></textarea>
                                )}
                            </li>
                        ))}
                    </ol>
                    {!isQuizSubmitted && (
                        <button className="submit-button" onClick={handleSubmit}>Submit Quiz</button>
                    )}
                </div>
            ) : (
                type === undefined ? null : <NotFound />
            )}
        </div>
    );
};

export default AttemptQuiz;
