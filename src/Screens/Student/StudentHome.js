import React from "react";
import NavBar from "../../Components/NavBar";
import Footer from "../../Components/Footer";

const AdminHome = ()=>{
return (<>
    <NavBar type="student" username={localStorage.getItem('username')}/>
    <div className="jumbotron">
                <h1><u>Welcome {localStorage.getItem('username')}!</u></h1>
            </div>
    <div className="features">
                <div className="feature">
                    <img src="https://via.placeholder.com/200" alt="Feature Image 1" />
                    <div className="feature-content">
                       <button>Retake Quiz</button>
                        <br />
                        <button>See Results</button>
                    </div>
                </div>
                <div className="feature">
                    <img src="https://via.placeholder.com/200" alt="Feature Image 2" />
                    <div className="feature-content">
                    <button>Retake Quiz</button>
                        <br />
                        <button>See Results</button>
                    </div>
                </div>
                <div className="feature">
                    <img src="https://via.placeholder.com/200" alt="Feature Image 3" />
                    <div className="feature-content">
                       <button>Retake Quiz</button>
                        <br />
                        <button>See Results</button>
                    </div>
                </div>
            </div>
    <Footer />
</>)
}

export default AdminHome;