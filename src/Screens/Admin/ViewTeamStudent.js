import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NotFound from "../../Components/NotFound";
import auth from '../../Components/Auth';

const ViewTeamStudent = () => {
  const { teamId } = useParams();
  const [students, setStudents] = useState([]);
  const [type, setType] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      try {
        const userType = await auth();
        setType(userType);
        fetchStudents();
      } catch (error) {
        console.error('Error:', error.message);
        setType(null);
      }
    }

    fetchData();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/teams/${teamId}/students`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

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
      {type === "admin" ? (
        <div className="quiz-list-container">
          <h2>Students</h2>
          <Link to={`/teams/${teamId}/add-student`}><button className='view-btn'>Add Student</button></Link>
          <ul>
            {students.map((student, index) => (
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
        type === undefined ? null : <NotFound />
      )}
    </>
  );
};

export default ViewTeamStudent;
