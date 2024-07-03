import React from 'react';
import '../style/AboutUs.css'; // Ensure the CSS file is correctly imported

export default function AboutUs() {
  return (
    <div>
      <header className="about-header">
        <div className="about-container">
          <h1>About Us</h1>
        </div>
      </header>

      <div className="about-container">
        <div className="about-content">
          <h2>Welcome to BrainBuster!</h2>
          <p>
            At BrainBuster, we believe that learning should be fun, engaging, and accessible to everyone. 
            Whether you're a trivia enthusiast, a student preparing for exams, or someone who loves a good 
            challenge, our platform is designed to provide an enriching and entertaining experience for all.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            Our mission is to create an interactive and dynamic learning environment where users can test 
            their knowledge, learn new facts, and compete with others from around the world. We strive to 
            make education enjoyable and to foster a community of curious minds.
          </p>
          
          <h2>What We Offer</h2>
          <ul>
            <li>
              <strong>Admin Capabilities</strong>: Manage the creation of quizzes and teams, and oversee quiz and student management.
            </li>
            <li>
              <strong>Student Engagement</strong>: Join teams, take quizzes for all enrolled teams, and view quiz results.
            </li>
            <li>
              <strong>Collaborative Learning</strong>: Facilitate collaborative learning through team-based quiz activities and interactions.
            </li>
            <li>
              <strong>Flexible Management</strong>: Easily organise and adapt teams and quizzes to meet educational needs.
            </li>
          </ul>
          <h2>Join Us</h2>
          <p>
            Become a part of the BrainBuster community today and embark on a journey of knowledge and fun. Whether you're 
            here to challenge yourself or to learn something new, we have something for everyone. Let's make learning 
            an adventure together!
          </p>
          
          <p><strong>Happy Quizzing!</strong></p>
          <p>The BrainBuster Team</p>
        </div>
      </div>

      <footer className="about-footer">
        <div className="about-container">
          <p>&copy; 2024 BrainBuster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
