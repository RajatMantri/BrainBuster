import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../Components/NavBar";

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const type = localStorage.getItem("type");
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
      console.log("Password changed successfully:", response.data);
      setShowChangePasswordModal(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      // Handle error state or show an error message to the user
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

    fetchProfileData();
  }, [username]); // Include username in dependency array to fetch data when username changes

  if (!profileData) {
    return <p>Loading profile...</p>;
  }

  return (
    <>
      <NavBar type={type} username={username} /> {/* Assuming NavBar handles type and username */}
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
    </>
  );
};

export default Profile;
