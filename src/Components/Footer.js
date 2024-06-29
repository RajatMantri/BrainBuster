import React from "react";

const Footer = () => {
  return (
    <footer>
  <div className="FooterContainer">
    <div className="row">
      <div className="col-md-4">
        <h5>About Us</h5>
        <p>We are passionate about creating engaging quizzes for our users. Join us on our journey!</p>
      </div>
      <div className="col-md-4">
        <h5>Social Media</h5>
        <ul className="social-links">
          <li><a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i> Facebook</a></li>
          <li><a href="https://www.twitter.com/"><i className="fab fa-twitter"></i> Twitter</a></li>
          <li><a href="https://www.instagram.com/"><i className="fab fa-instagram"></i> Instagram</a></li>
          <li><a href="https://www.linkedin.com/"><i className="fab fa-linkedin"></i> LinkedIn</a></li>
        </ul>
      </div>
      <div className="col-md-4">
        <h5>Contact Us</h5>
        <p>Email: example@example.com</p>
        <p>Phone: +1234567890</p>
        <p>Address: 123 Street, City, Country</p>
      </div>
    </div>
  </div>
</footer>


  );
};

export default Footer;
