import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NotFound from "../../Components/NotFound";
import auth from '../../Components/Auth';

const ViewQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [type, setType] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const userType = await auth();
        setType(userType);
        fetchQuiz();
      } catch (error) {
        console.error('Error:', error.message);
        setType(null);
      }
    }

    fetchData();
  }, []);

  const fetchQuiz = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/quiz/${quizId}`);
      setQuiz(response.data);
    } catch (error) {
      console.error('Error fetching quiz:', error);
    }
  };

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const getOptionStyle = (question, index) => {
    if (question.correctAnswer === index) {
      return { color: 'green' };
    }

    return {};
  };

  return (
    <>
      {type === "admin" ? (
        <div>
          <div className="view-quiz-container">
            <h2>{quiz.title}</h2>
            <p>Duration: {quiz.duration} minutes</p>
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
                              checked={(parseInt)(question.correctAnswer) === index}
                              // onChange={() => handleOptionChange(question._id, index)}
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
                          checked={(parseInt)(question.correctAnswer) === 0}
                          // onChange={() => handleOptionChange(question._id, true)}
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
                          checked={(question.correctAnswer) === 1}
                          // onChange={() => handleOptionChange(question._id, false)}
                          disabled
                        />
                        False
                      </label>
                      <br />
                    </div>
                  )}
                  {question.type === 'paragraph' && (
                    <p style={{color: "green"}}>{question.correctAnswer}</p>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ) : (
        type === undefined ? null : <NotFound />
      )}
    </>
  );
};

export default ViewQuiz;
