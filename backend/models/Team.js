const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    teamName: String,
    Code: String,
    Students: [{ type: String }], 
    Owner: String, // Owner's username of the quiz
    quizzes: [{_id: String, 
      title: String}] 
  });

  module.exports = mongoose.model('Team',teamSchema);