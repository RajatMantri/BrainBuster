const express = require('express');
const router = express.Router();
const Team = require('../../models/Team.js');

router.get('/teams/:teamId/students', async (req, res) => {
    const { teamId } = req.params;

  try {
    // Find the team by teamId
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: 'Team not found' });
    }

    // Extract students from the team object
    const students = team.Students;

    // Respond with the list of students
    res.json(students);
    // console.log(students);
} catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/teams/:teamId/students/:name', async (req, res) => {
   const teamId = req.params.teamId;
   const name = req.params.name;
   
  try {
    // Find the team and remove the student from the Students array
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
  try{
        // Find the team by teamId
        const teamId = req.params.teamId;
        const username = req.body.name;

        const team = await Team.findById(teamId);

        if (!team) {
          return res.status(404).json({ error: 'Team not found' });
        }
    
        // Check if username already exists in Students array
        if (team.Students.includes(username)) {
          return res.status(400).json({ error: 'Student already exists in the team' });
        }
    
        // Push username into Students array
        team.Students.push(username);
    
        // Save the updated team object
        await team.save();
    
        res.status(200).json(team);
} catch (error) {
  console.error('Error fetching students:', error);
  res.status(500).json({ error: 'Server error' });
}
});

module.exports = router;