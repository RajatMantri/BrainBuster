import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route,Link, Navigate } from "react-router-dom";


//Styling
import './style/App.css'
import './style/ScreensStyling/Login.css';
import './style/ScreensStyling/Home.css';
import './style/ScreensStyling/SignUp.css';
import './style/ScreensStyling/DropDown.css';

//Components
import Home from './Screens/Home';
import Login from './Screens/Login.js'
import SignUp from './Screens/SignUp.js'
import NotFound from './Components/NotFound.js';
import AdminHome from './Screens/Admin/AdminHome.js';
import StudentHome from './Screens/Student/StudentHome.js';

const App = ()=>{

  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
      // Check if authToken exists in localStorage
      const token = localStorage.getItem('authToken');
      setAuthToken(token);
  }, []);

return(
  <div>
<Routes>
  <Route path='/'  element={<Home type='home'/>} />
  <Route path='/login'  element={<Login />} />  
  <Route path='/signUp'  element={<SignUp />} />
  <Route path="/adminHome" element={<AdminHome />} />
  <Route path="/studentHome" element={<StudentHome />}/>
  <Route path="*" element={<NotFound />} />
</Routes>
  </div>
)
}

export default App;

