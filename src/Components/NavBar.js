import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleCreateMenu = () => {
        setIsCreateMenuOpen(!isCreateMenuOpen);
    };

    const handleLogOut = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        localStorage.removeItem("type");
        navigate("/");
    }

    return (
        <>
            <nav className="navbar">
                <div className="navbar-brand">
                    <h1>BrainBusters</h1>
                    <Link to="/" className="home-button">Home</Link>
                    <Link to="/aboutUs" className="home-button">About Us</Link>
                    <Link to="/faq" className="home-button">FAQs</Link>
                </div>
               
                <div className="auth-buttons">
                    {props.type === 'home' && (
                        <>
                            <Link to='/signup'><button>Sign-Up</button></Link>
                            <Link to="/login"><button>Login</button></Link>
                        </>
                    )}
                    {props.type === 'student' && (
                        <>
                            <Link to={`/studentHome/PreviousTeam/`} className="link-button"><button>Teams</button></Link>
                            <Link to={`/studentHome/Results/`} className="link-button"><button>Results</button></Link>
                            <Link to={`/studentHome/JoinTeam/`} className="link-button"><button>Join Team</button></Link>
                            <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} onTouchStart={toggleDropdown}>
                                <button className="dropbtn">{props.username}</button>
                                {isOpen && (
                                    <div className="dropdown-content">
                                    <Link to={`/profile/${username}`}>My Profile</Link>
                                        <a><div onClick={handleLogOut}>LogOut</div></a>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                    {props.type === 'admin' && (
                        <>
                            <Link to={`/adminHome/quiz`} className="link-button"><button>Quiz</button></Link>
                            <Link to={`/adminHome/team`} className="link-button"><button>Teams</button></Link>
                            <div className="dropdown" onMouseEnter={toggleCreateMenu} onMouseLeave={toggleCreateMenu} onTouchStart={toggleCreateMenu}>
                                <button className="dropbtn">Create</button>
                                {isCreateMenuOpen && (
                                    <div className="dropdown-content">
                                        <Link to={`/adminHome/createQuiz/`}>Quiz</Link>
                                        <Link to={`/adminHome/createTeam/`}>Team</Link>
                                    </div>
                                )}
                            </div>
                            <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} onTouchStart={toggleDropdown}>
                                <button className="dropbtn">{props.username}</button>
                                {isOpen && (
                                    <div className="dropdown-content">
                                        <Link to={`/profile/${username}`}>My Profile</Link>
                                        <a><div onClick={handleLogOut}>LogOut</div></a>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </nav>
        </>
    );
};

export default NavBar;
