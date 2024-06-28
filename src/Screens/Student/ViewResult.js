import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NotFound from "../../Components/NotFound";


const ViewResult = () => {
  const { quizId } = useParams();
  const username = localStorage.getItem('username');
  const type = localStorage.getItem('type');
  const [quizData, setQuizData] = useState(null);
  const [score, setScore] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [selectedAttempt, setSelectedAttempt] = useState(null);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/getResponse/${quizId}/${username}`);
        setQuizData(response.data);
        calculateScore(response.data);

        const attemptNumbers = Array.from({ length: response.data.attempt + 1 }, (_, i) => i);
        setAttempts(attemptNumbers);

      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchAttempts();
  }, [quizId]);

  const fetchQuizData = async (attempt) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/getResponse/${quizId}/${username}/${attempt}`);
      setQuizData(response.data);
      calculateScore(response.data);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleAttemptChange = (event) => {
    const selectedAttempt = parseInt(event.target.value);
    setSelectedAttempt(selectedAttempt);
    fetchQuizData(selectedAttempt);
  };

  const calculateScore = (quiz) => {
    let totalQuestions = quiz.questions.length;
    let correctAnswers = 0;

    quiz.questions.forEach((question) => {
      if (question.selectedAnswer === question.correctAnswer) {
        correctAnswers++;
      }
    });

    setScore(correctAnswers);
    setTotalScore(totalQuestions);
  };

  return (
    <div className="result-container">
      {localStorage.getItem('username') && type === "student" ? (
        <div>
          <h2 className="result-heading">Quiz Result</h2>
          <div className="attempt-select">
            <label htmlFor="attemptSelect">Select Attempt:</label>
            <select id="attemptSelect" onChange={handleAttemptChange} value={selectedAttempt}>
              {attempts.map((attempt, index) => (
                <option key={index} value={attempt}>
                  Attempt {attempt + 1}
                </option>
              ))}
            </select>
          </div>
          <p className="score-text">Score: {score}/{totalScore}</p>
          {quizData && (
            <div>
              <h3>{quizData.title}</h3>
              <ul className="questions-list">
                {quizData.questions.map((question, index) => (
                  <li key={index}>
                    <p className="question-title">{question.title}</p>
                    <ul className="options-list">
                      {question.options.map((option, optionIndex) => (
                        <li
                          key={optionIndex}
                          className={`option-item ${question.selectedAnswer === option ? (option === question.correctAnswer ? "correct" : "incorrect") : ""}`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default ViewResult;
