import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Import useNavigate
import NotFound from "../../Components/NotFound";


const Quiz = () => {
  const type=localStorage.getItem('type');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [quizTitle, setQuizTitle] = useState("My Quiz");
  const [quizDuration, setQuizDuration] = useState(10); // Initial duration in minutes
  const username = localStorage.getItem('username');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "Default Question",
      type: "multipleChoice",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: null
    }
  ]);

  const navigate = useNavigate();

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };

  const handleQuizDurationChange = (e) => {
    const duration = parseInt(e.target.value);
    setQuizDuration(duration);
  };

  const handleQuestionTitleChange = (index, e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].title = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleQuestionTypeChange = (index, e) => {
    const type = e.target.value;
    let updatedOptions = [];

    if (type === 'multipleChoice') {
      updatedOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
    }

    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    updatedQuestions[index].options = type === 'multipleChoice' ? updatedOptions : [];

    // Set correctAnswer for True/False questions
    if (type === 'trueFalse') {
      updatedQuestions[index].correctAnswer = 0; // Default to 0 (true)
    } else if (type === 'paragraph') {
      updatedQuestions[index].correctAnswer = ''; // Clear correctAnswer for paragraph questions
    }

    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, e) => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[questionIndex].type === 'paragraph') {
      updatedQuestions[questionIndex].correctAnswer = e.target.value;
    } else {
      updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
    }
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = index;
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      title: "New Question",
      type: "multipleChoice",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: null
    };
    setQuestions([...questions, newQuestion]);
  };

  const handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = questions.filter((_, index) => index !== questionIndex);
    setQuestions(updatedQuestions.length === 0 ? [{
      id: 1,
      title: "Default Question",
      type: "multipleChoice",
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: null
    }] : updatedQuestions);
  };

  const handleSubmitQuiz = () => {
    // Check if any question does not have a correctAnswer selected
    const hasUnansweredQuestions = questions.some(question => question.correctAnswer === null);

    if (hasUnansweredQuestions) {
      alert('Please select a correct answer for all questions before submitting.');
      return; // Exit early if there are unanswered questions
    }

    const quizData = {
      username: username,
      title: quizTitle,
      duration: quizDuration,
      questions: questions,
    };
    // console.log(quizData);
    axios.post('http://localhost:4000/api/submitQuiz', quizData)
      .then(response => {
        navigate(`/adminHome/`);
        console.log('Quiz submitted successfully:');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      {localStorage.getItem('username') && type === "admin" ? (
        <div>
          <div className="quiz-container">
            <input className={`quiz-title ${isEditingTitle ? 'editing' : ''}`} onClick={handleTitleClick}
              type="text"
              value={quizTitle}
              onChange={handleQuizTitleChange}
              onBlur={handleTitleBlur}
              autoFocus
            />

            <div className="duration-container">
              <label>Quiz Duration (minutes):</label>
              <input
                type="number"
                value={quizDuration}
                onChange={handleQuizDurationChange}
                min="1"
                step="1"
              />
            </div>

            {questions.map((question, index) => (
              <div key={question.id} className="question-container">
                <input
                  type="text"
                  value={question.title}
                  onChange={(e) => handleQuestionTitleChange(index, e)}
                  className="question-input"
                />
                <select
                  value={question.type}
                  onChange={(e) => handleQuestionTypeChange(index, e)}
                  className="select-type"
                >
                  <option value="multipleChoice">MCQs</option>
                  <option value="trueFalse">True/False</option>
                  <option value="paragraph">Paragraph</option>
                </select>

                {question.type === 'multipleChoice' && (
                  <div>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="option-container">
                        <input
                          type="radio"
                          name={`correctAnswer${index}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => handleCorrectAnswerChange(index, optionIndex)}
                          className="option-radio"
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => handleOptionChange(index, optionIndex, e)}
                          className="option-input"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {question.type === 'trueFalse' && (
                  <div>
                    <div className="option-container">
                      <input
                        type="radio"
                        name={`trueFalseOption${index}`}
                        value="True"
                        checked={question.correctAnswer === 0}
                        onChange={() => handleCorrectAnswerChange(index, 0)}
                        className="option-radio"
                      />
                      <label className="correct-answer-label">True</label>
                    </div>
                    <div className="option-container">
                      <input
                        type="radio"
                        name={`trueFalseOption${index}`}
                        value="False"
                        checked={question.correctAnswer === 1}
                        onChange={() => handleCorrectAnswerChange(index, 1)}
                        className="option-radio"
                      />
                      <label className="correct-answer-label">False</label>
                    </div>
                  </div>
                )}

                {question.type === 'paragraph' && (
                  <div className="option-container">
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      onChange={(e) => handleOptionChange(index, 0, e)}
                      className="option-input"
                    />
                  </div>
                )}

                <div className="button-container">
                  <button onClick={() => handleDeleteQuestion(index)} className="delete-button">Delete Question</button>
                </div>
              </div>
            ))}

            <div className="button-container">
              <button onClick={handleAddQuestion} className="add-button">Add Question</button>
            </div>

            <div className="button-container">
              <button onClick={handleSubmitQuiz} className="submit-button">Submit Quiz</button>
            </div>
          </div>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Quiz;
