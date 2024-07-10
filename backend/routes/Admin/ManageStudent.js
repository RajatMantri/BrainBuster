const express = require('express');
const router = express.Router();
const Team = require('../../models/Team.js');
const User = require('../../models/User.js'); 

router.get('/teams/:teamId/students', async (req, res) => {
    const { teamId } = req.params;

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const students = team.Students;
    res.json(students);

} catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/teams/:teamId/students/:name', async (req, res) => {
   const teamId = req.params.teamId;
   const name = req.params.name;
   
  try {
    const team = await Team.findByIdAndUpdate(
        teamId,
        { $pull: { Students: name } },
        { new: true }
      );
  
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }
  
      res.json({ message: 'Student removed successfully', team });
} catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/teams/:teamId/add-student', async (req, res) => {
  try {
    const teamId = req.params.teamId;
    const username = req.body.name;

    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    const user = await User.findOne({ username: username, userType: 'student' });

    if (!user) {
      return res.status(400).json({ error: 'Username does not exist or is not a student' });
    }

    if (team.Students.includes(username)) {
      return res.status(400).json({ error: 'Student already exists in the team' });
    }

    team.Students.push(username);

    await team.save();

    res.status(200).json(team);
  } catch (error) {
    console.error('Error adding student to team:', error);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;