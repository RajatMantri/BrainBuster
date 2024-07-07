const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: String,
    Code: String,
    Students: [{ type: String }], // Array of student usernames
    Owner: String, // Owner's username of the quiz
    quizzes: [{_id: String, // Reference to Quiz model
      title: String}] // Array of quiz IDs associated with the team
  });

  module.exports = mongoose.model('Team',teamSchema);