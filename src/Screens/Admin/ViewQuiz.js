import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotFound from "../../Components/NotFound";

const ViewQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
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

  const handleOptionChange = (questionId, index) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: index,
    }));
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const getOptionStyle = (question, index) => {
    if (question.correctAnswer === index) {
      return { color: 'green' };
    }
    if (answers[question._id] === index) {
      return { color: 'red' };
    }
    return {};
  };

  return (
    <>
      {localStorage.getItem('username') && type === "admin" ? (
        <div>
          <div className="view-quiz-container">
            <h2>{quiz.title}</h2>
            <ol>
              {quiz.questions.map((question) => (
                <li key={question._id}>
                  <h4>{question.title}</h4>
                  {question.type === 'multipleChoice' && (
                    <ul>
                      {question.options.map((option, index) => (
                        <div key={index}>
                          <label style={getOptionStyle(question, index)}>
                            <input
                              type="radio"
                              name={`question-${question._id}`}
                              value={index}
                              checked={(parseInt)(question.correctAnswer)=== index}
                              onChange={() => handleOptionChange(question._id, index)}
                              disabled
                            />
                            {option}
                          </label>
                          <br />
                        </div>
                      ))}
                    </ul>
                  )}
                  {question.type === 'trueFalse' && (
                    <div>
                      <label style={getOptionStyle(question, 0)}>
                        <input
                          type="radio"
                          name={`question-${question._id}`}
                          value="true"
                          checked={answers[question._id] === true}
                          onChange={() => handleOptionChange(question._id, true)}
                          disabled
                        />
                        True
                      </label>
                      <br />
                      <label style={getOptionStyle(question, 1)}>
                        <input
                          type="radio"
                          name={`question-${question._id}`}
                          value="false"
                          checked={answers[question._id] === false}
                          onChange={() => handleOptionChange(question._id, false)}
                          disabled
                        />
                        False
                      </label>
                      <br />
                    </div>
                  )}
                  {question.type === 'paragraph' && (
                    <p>Correct Answer: {question.correctAnswer}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ViewQuiz;
