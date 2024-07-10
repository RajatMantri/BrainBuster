import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/submitLogin', formData);

      if (response.status === 200) {
        const userType = response.data.user.userType;
        const authToken = response.data.authToken;

        const options = {
          expires: new Date(
            Date.now() + 13 * 24 * 60 * 60 * 1000
          ),
          secure: true
        };

        Cookies.set('authToken', authToken, options);
        localStorage.setItem("username", formData.username);

        if (userType === 'student') {
          navigate(`/studentHome`);
        } else if (userType === 'admin') {
          navigate(`/adminHome`);
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response && error.response.status === 400) {
        alert('Invalid Email or Password');
      } else {
        alert('Error submitting form. Please try again later.');
      }
    }
  };

  return (
    <div className="LogInContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
