import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NotFound from "../../Components/NotFound";

const ViewTeamStudent = () => {
  const { teamId } = useParams();
  const [students, setStudents] = useState([]);
  const type = localStorage.getItem('type');

  useEffect(() => {
    axios.get(`http://localhost:4000/api/teams/${teamId}/students`)
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, [teamId]);

  const removeStudent = (studentName) => {
    axios.delete(`http://localhost:4000/api/teams/${teamId}/students/${studentName}`)
      .then(response => {
        setStudents(students.filter(student => student !== studentName));
        alert("Student removed successfully");
      })
      .catch(error => {
        console.error('Error removing student:', error);
      });
  };

  return (
    <>
      {localStorage.getItem('username') && type === "admin" ? (
        <div className="quiz-list-container">
          <h2>Students</h2>
          <Link to={`/teams/${teamId}/add-student`}><button className='view-btn'>Add Student</button></Link>
          <ul>
            {students.map((student,index) => (
              <li key={index}>
                {student}
                <div>
                <button onClick={() => removeStudent(student)} className="delete-btn">Boot</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default ViewTeamStudent;
