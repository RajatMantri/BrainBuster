const bcrypt = require("bcryptjs");
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.get('/profile/:username', async (req, res) => {
    const { username } = req.params;
        try {
          const user = await User.findOne({ username });
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          res.json({
            username: user.username,
            phoneNumber: user.phoneNumber,
            email: user.email,
            userType: user.userType
          })
    } catch (error) {
      console.error('Error fetching profile data:', error);
      res.status(500).json({ error: 'Failed to fetch profile data' });
    }
  });

  router.post('/:username/change-password', async (req, res) => {
    const  username  = req.params.username;
    const  currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword
   console.log(username);
    try {
      
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
  
      const salt = await bcrypt.genSalt(10);
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  
 
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error changing password:', error);
      res.status(500).json({ error: 'Failed to change password' });
    }
  });

module.exports = router;