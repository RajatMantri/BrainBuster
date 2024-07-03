import React, { useState } from 'react';
import '../style/FAQ.css'; // Ensure the CSS file is correctly imported

const FAQ = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const toggleQuestion = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  const faqData = [
    {
      question: "What is this quizzing website about?",
      answer: "This website allows users to take quizzes on various topics to test and improve their knowledge."
    },
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button at the top right corner and fill in your details to create an account."
    },
    {
      question: "Can I create my own quizzes?",
      answer: "Yes, once you are logged in, you can create your own quizzes by navigating to the 'Create Quiz' section."
    },
    {
      question: "How do I reset my password?",
      answer: "If you have forgotten your password, click on 'Forgot Password' on the login page and follow the instructions."
    },
    {
      question: "Is there a limit to the number of quizzes I can take?",
      answer: "No, you can take as many quizzes as you want. Enjoy learning!"
    }
  ];

  return (
    <>
      <div className="faq-container">
        <h1 className="faq-header">Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`faq-item ${selectedQuestion === index ? 'open' : ''}`}
              onClick={() => toggleQuestion(index)}
            >
              <div className="faq-question">{item.question}</div>
              {selectedQuestion === index && <div className="faq-answer">{item.answer}</div>}
            </div>
          ))}
        </div>
      </div>
      <footer className="faq-footer">
        <p>For further information, contact us at:</p>
        <p>Email: <a href="mailto:info@BrainBuster.com">info@BrainBuster.com</a></p>
        <p>Phone: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
      </footer>
    </>
  );
};

export default FAQ;
