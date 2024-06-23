const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new mongoose.Schema({
    teamName: String,
    Code: String,
    Students: [{ type: String }], // Array of student usernames
    Owner: String, // Owner's username of the quiz
    quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }] // Array of quiz IDs associated with the team
  });

  module.exports = mongoose.model('team',teamSchema);