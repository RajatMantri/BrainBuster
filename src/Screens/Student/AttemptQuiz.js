import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NotFound from '../../Components/NotFound';
import { useNavigate } from 'react-router-dom';

const AttemptQuiz = () => {
    let nav=useNavigate();
    const { quizId } = useParams();
    const [quiz, setQuiz] = useState(null);
    const username = localStorage.getItem('username');
    const type = localStorage.getItem('type');

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/quiz/${quizId}`);
            setQuiz(response.data);
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
            await axios.post(`http://localhost:4000/api/SaveResponse/${quizId}/${username}`, quiz);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
        nav('/studentHome/PreviousTeam');
    };

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div className="attempt-quiz-container">
            {localStorage.getItem('username') && type === "student" ? (
                <div>
                    <h2 className="quiz-title_f">{quiz.title}</h2>
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
                    <button className="submit-button" onClick={handleSubmit}>Submit Quiz</button>
                </div>
            ) : (
                <NotFound />
            )}
        </div>
    );
};

export default AttemptQuiz;
