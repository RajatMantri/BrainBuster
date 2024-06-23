import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route,Link, Navigate } from "react-router-dom";


//Styling
import './style/App.css'
import './style//Login.css';
import './style//Home.css';
import './style//SignUp.css';
import './style/DropDown.css';
import './Screens/ScreensStyling/Admin/createQuiz.css';
import './Screens/ScreensStyling/Admin/createTeam.css';
import './Screens/ScreensStyling/Admin/adminQuizList.css';
import './Screens/ScreensStyling/Admin/viewQuiz.css';

//Components
import Home from './Screens/Home';
import Login from './Screens/Login.js'
import SignUp from './Screens/SignUp.js'
import NotFound from './Components/NotFound.js';
import AdminHome from './Screens/Admin/AdminHome.js';
import StudentHome from './Screens/Student/StudentHome.js';
import CreateQuiz from './Screens/Admin/CreateQuiz.js';
import CreateTeam from './Screens/Admin/CreateTeam.js';
import AdminQuizList from './Screens/Admin/AdminQuizList.js';
import ViewQuiz from './Screens/Admin/ViewQuiz.js';
import AdminTeamList from './Screens/Admin/AdminTeamList.js';
import ManageTeam from './Screens/Admin/ManageTeam.js';

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
  <Route path="/studentHome" element={<StudentHome />}/>
  <Route path="/adminHome/createQuiz" element={<CreateQuiz/>} />
  <Route path="/adminHome/createTeam" element={<CreateTeam/>} />
  <Route path="/adminHome/quiz" element={<AdminQuizList/>} />
  <Route path="/adminHome/quiz/:quizId" element={<ViewQuiz/>} />
  <Route path="/adminHome/team" element={<AdminTeamList/>} />
  <Route path="/adminHome/team" element={<AdminTeamList/>} />
  <Route path="/adminHome/team/manage/:quizId" element={<ManageTeam/>} />
  <Route path="*" element={<NotFound />} />
</Routes>
  </div>
)
}

export default App;

