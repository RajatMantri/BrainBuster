import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";
import NotFound from "../Components/NotFound"
import auth from "../Components/Auth";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState(undefined);
  const username = localStorage.getItem("username");

  const handleOpenModal = () => {
    setShowChangePasswordModal(true);
  };

  const handleCloseModal = () => {
    setShowChangePasswordModal(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/${username}/change-password`,
        { currentPassword, newPassword }
      );
      alert("Password changed successfully");
      setShowChangePasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert("Enter correct current password");
    }
  };

  const handlePasswordChangeInput = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/profile/${username}`
        );
        setProfileData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    async function fetchData() {
      try {
        const userType = await auth();
        setType(userType);
        fetchProfileData();
      } catch (error) {
        console.error('Error:', error.message);
        setType(null);
      }
    }

    fetchData();
  }, []);

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
      {type === "student" || type === "admin" ? (
        <div>
          <NavBar type={type} username={username} />
          <div className="profile-container">
            <h2>Profile</h2>
            <div className="profile-details">
              <div>
                <strong>Name:</strong> {profileData.username}
              </div>
              <div>
                <strong>Phone Number:</strong> {profileData.phoneNumber}
              </div>
              <div>
                <strong>Email:</strong> {profileData.email}
              </div>
            </div>
            <button className="change-password-btn" onClick={handleOpenModal}>
              Change Password
            </button>

            {showChangePasswordModal && (
              <div className="password-modal">
                <div className="password-modal-content">
                  <span className="close" onClick={handleCloseModal}>
                    &times;
                  </span>
                  <h2>Change Password</h2>
                  <div className="form-group">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={handlePasswordChangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={handlePasswordChangeInput}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={handlePasswordChangeInput}
                    />
                  </div>
                  <button onClick={handleChangePassword}>Save</button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        type === undefined ? null : <NotFound />
      )}
    </>
  );
};


export default Profile;
