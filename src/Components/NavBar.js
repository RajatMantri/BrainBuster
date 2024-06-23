import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleCreateMenu = () => {
        setIsCreateMenuOpen(!isCreateMenuOpen);
    };

    const handleLogOut = ()=>{
        localStorage.removeItem("authToken");
        localStorage.removeItem("username");
        navigate("/");
    }
    
    return (
        <>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About Us</Link></li>
                    <li><Link href="/faq">FAQs</Link></li>
                </ul>
                <div className="auth-buttons">
                   
                    {props.type === 'home' && (
                        <>
                        <Link to='/signup'><button>Sign-Up</button></Link>
                        <Link to="/login"><button>Login</button></Link>
                        </>
                    )}

                    {props.type === 'student' && (
                        <Link to={`/studentHome/PreviousTeam/`} className="link-button"><button>Previous Teams</button></Link>
                    )}

                    {props.type === 'student' && (
                        <Link to={`/studentHome/Results/`} className="link-button"><button>Results</button></Link>
                    )}
                   
                    {props.type === 'student' && (
                        <Link to={`/studentHome/JoinTeam/`} className="link-button"><button>Join Team</button></Link>
                    )}

                    {props.type === 'student' && (
                        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} onTouchStart={toggleDropdown}>
                            <button className="dropbtn">{props.username}</button>
                            {isOpen && (
                                <div className="dropdown-content">
                                    <a href="#">My Profile</a>
                                    <a><div onClick={handleLogOut}>LogOut</div></a>
                                </div>
                            )}
                        </div>
                    )}


                    {props.type === 'admin' && (
                        <Link to={`/adminHome/quiz`} className="link-button"><button>Quiz</button></Link>
                    )}

                    {props.type === 'admin' && (
                        <Link to={`/adminHome/team`} className="link-button"><button>Teams</button></Link>
                    )}
                    
                    {props.type === 'admin' && (
                        <div className="dropdown" onMouseEnter={toggleCreateMenu} onMouseLeave={toggleCreateMenu} onTouchStart={toggleCreateMenu}>
                            <button className="dropbtn">+</button>
                            {isCreateMenuOpen && (
                                <div className="dropdown-content">
                                    <Link to={`/adminHome/createQuiz/`} >Quiz</Link>
                                    <Link to={`/adminHome/createTeam/`} >Team</Link>
                                </div>
                            )}
                        </div>
                    )}

                    {props.type === 'admin' && (
                        <div className="dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown} onTouchStart={toggleDropdown}>
                            <button className="dropbtn">{props.username}</button>
                            {isOpen && (
                                <div className="dropdown-content">
                                    <a href="#">My Profile</a>           
                                    <a><div onClick={handleLogOut}>LogOut</div></a> 
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </nav>
           
        </>
    );
};

export default NavBar;
