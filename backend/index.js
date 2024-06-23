const express = require('express');
const app = express();
const port = 4000;
const mongoDB = require('./db');
mongoDB();

const cors = require('cors');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', require('./routes/CreateUser.js'));
app.use('/api', require('./routes/Admin/CreateQuiz.js'));
app.use('/api', require('./routes/Admin/CreateTeam.js'));
app.use('/api', require('./routes/Admin/AdminQuizList.js'));
app.use('/api', require('./routes/Admin/AdminQuiz.js'));
app.use('/api', require('./routes/Admin/DeleteQuiz.js'));
app.use('/api', require('./routes/Admin/AdminTeamList.js'));

app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
