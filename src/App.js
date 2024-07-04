import React from 'react';
import { Routes, Route} from "react-router-dom";

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
import './Screens/ScreensStyling/Admin/adminTeamList.css';
import "./Screens/ScreensStyling/Admin/viewTeamquizzes.css"
import "./Screens/ScreensStyling/Admin/addQuizToTeam.css"
import "./Screens/ScreensStyling/Admin/deleteQuiz.css"
import "./Screens/ScreensStyling/Student/joinTeam.css"
import "./Screens/ScreensStyling/Student/viewTeams.css"
import "./Screens/ScreensStyling/Student/attemptQuiz.css"
import "./Screens/ScreensStyling/Student/result.css"
import "./Screens/ScreensStyling/Student/viewResult.css"
import "./Screens/ScreensStyling/Student/leaderboard.css"
import "./Screens/ScreensStyling/Admin/addStudent.css";
import "./Screens/ScreensStyling/Profile.css";

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
import DeleteQuiz from './Screens/Admin/DeleteQuiz.js';
import AddQuizToTeam from './Screens/Admin/AddQuizToTeam.js';
import ViewTeamQuizzes from './Screens/Admin/ViewTeamQuizzes';
import JoinTeam from './Screens/Student/JoinTeam.js';
import ViewTeams from "./Screens/Student/ViewTeams";
import ViewQuizzes from './Screens/Student/ViewQuiz.js';
import AttemptQuiz from './Screens/Student/AttemptQuiz.js';
import Result from "./Screens/Student/Result.js";
import ViewResult from  "./Screens/Student/ViewResult.js"
import LeaderBoard from './Screens/Student/Leaderboard.js';
import ViewTeamStudent from './Screens/Admin/ViewTeamStudent.js';
import AddStudent from './Screens/Admin/AddStudent.js';
import Profile from './Screens/Profile.js';
import AboutUs from './Components/AboutUs.js';
import FAQ from './Components/FAQ.js';

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home type='home' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='/profile/:username' element={<Profile />} />

        {/* Admin */}
        <Route path="/adminHome" element={<AdminHome /> }/>
        <Route path="/adminHome/createQuiz" element={ <CreateQuiz /> } />
        <Route path="/adminHome/createTeam" element={<CreateTeam /> } />
        <Route path="/adminHome/quiz" element={<AdminQuizList /> } />
        <Route path="/adminHome/quiz/:quizId" element={ <ViewQuiz /> } />
        <Route path="/quiz/:quizId" element={ <ViewQuiz /> } />
        <Route path="/adminHome/team" element={<AdminTeamList /> } />
        <Route path="quizzes/:teamId" element={<AddQuizToTeam/>} />
        <Route path="quizzes/delete/:teamId" element={<DeleteQuiz/>} />
        <Route path="team/manageQuiz/:teamId" element={<ViewTeamQuizzes/>} />
        <Route path="team/manageStudent/:teamId" element={<ViewTeamStudent/>} />
        <Route path="/teams/:teamId/add-student" element={<AddStudent/>} />

        {/* Student */}
        <Route path="/studentHome" element={ <StudentHome />} />
        <Route path="/studentHome/JoinTeam" element={<JoinTeam/>} />
        <Route path="/studentHome/PreviousTeam" element={<ViewTeams/>} />
        <Route path="/team/student/:teamId" element={<ViewQuizzes/>} />
        <Route path="/quiz/:quizId/attempt" element={<AttemptQuiz/>} />
        <Route path="/studentHome/Results" element={<Result/>} />
        <Route path="/quiz/:quizId/result" element={<ViewResult/>} />
        <Route path="/quiz/leaderboard/:quizId" element={<LeaderBoard/>} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App;