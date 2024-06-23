import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});

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

  return (
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
                    <label>
                      <input
                        type="radio"
                        name={`question-${question._id}`}
                        value={index}
                        checked={answers[question._id] === index}
                        onChange={() => handleOptionChange(question._id, index)}
                        disabled
                      />
                      {option}
                    </label>
                    <br />
                  </div>
                ))}
                <p>Correct Answer: {question.options[question.correctAnswer]}</p>
              </ul>
            )}
            {question.type === 'trueFalse' && (
              <div>
                <label>
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
                <label>
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
                <p>Correct Answer: {question.correctAnswer === 0 ? 'True' : 'False'}</p>
              </div>
            )}
            {question.type === 'paragraph' && (
              <p>Correct Answer: {question.correctAnswer}</p>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ViewQuiz;
