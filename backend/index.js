const express = require('express');
const app = express();
const port = 4000;
const mongoDB = require('./db.js');
mongoDB();

const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', require('./routes/CreateUser.js'));
app.use('/api', require('./routes/Profile.js'));
app.use('/api', require('./routes/Auth.js'));

app.use('/api', require('./routes/Admin/CreateQuiz.js'));
app.use('/api', require('./routes/Admin/CreateTeam.js'));
app.use('/api', require('./routes/Admin/AdminQuizList.js'));
app.use('/api', require('./routes/Admin/AdminQuiz.js'));
app.use('/api', require('./routes/Admin/DeleteQuiz.js'));
app.use('/api', require('./routes/Admin/AdminTeamList.js'));
app.use('/api', require('./routes/Admin/AddQuizToTeams.js'));
app.use('/api', require('./routes/Admin/DeleteTeam.js'));
app.use('/api', require('./routes/Admin/ManageStudent.js'));


app.use('/api', require('./routes/Student/JoinTeam.js'));
app.use('/api', require('./routes/Student/ViewTeam.js'));
app.use('/api', require('./routes/Student/AttemptQuiz.js'));
app.use('/api', require('./routes/Student/AttemptedQuizzes.js'));
app.use('/api', require('./routes/Student/ViewResult.js'));
app.use('/api', require('./routes/Student/Leaderboard.js'));

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
