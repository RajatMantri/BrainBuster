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
        setScore(response.data.score);
        setTotalScore(response.data.questions.length);
        const attemptNumbers = Array.from({ length: response.data.attempt + 1 }, (_, i) => i);
        setAttempts(attemptNumbers);

      } catch (error) {
        console.error('Error fetching quiz data:', error);
      }
    };

    fetchAttempts();
    fetchQuizData(0);
  }, [quizId]);

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  const fetchQuizData = async (attempt) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/getResponse/${quizId}/${username}/${attempt}`);
      setQuizData(response.data);
      setScore(response.data.score);
      setTotalScore(response.data.questions.length);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleAttemptChange = (event) => {
    const selectedAttempt = parseInt(event.target.value);
    setSelectedAttempt(selectedAttempt);
    fetchQuizData(selectedAttempt);
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
            <p >Time Taken: {formatTime(quizData.timeTaken)} </p> 
              <h3>{quizData.title}</h3>
              <ul className="questions-list">
                {quizData.questions.map((question, index) => (
                  <li key={index}>
                    <p className="question-title">Q{index+1} {question.title}</p>
                    <ul className="options-list">
                      {question.options.map((option, optionIndex) => {
                        const isCorrectAnswer = optionIndex === question.correctAnswer;
                        const isSelectedAnswer = optionIndex === (parseInt)(question.selectedAnswer);
                        let style = {'color': ''};

                        if (isSelectedAnswer) {
                          style.color = isCorrectAnswer ? 'green' : 'red';
                        } else if (isCorrectAnswer) {
                          style.color = 'green';
                        }

                        return (
                          <li key={optionIndex}>
                            <label>
                              <input
                                type="radio"
                                name={`question-${index}`}
                                value={option}
                                checked={isSelectedAnswer}
                                disabled
                                readOnly
                              />
                              <span style={style}>
                                {option}
                              </span>
                            </label>
                          </li>
                        );
                      })}
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
