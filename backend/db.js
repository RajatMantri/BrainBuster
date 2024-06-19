const mongoose = require('mongoose');
const mongoURL = 'mongodb://0.0.0.0:27017/BrainBuster';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log("connected");
  } 
  catch (err) {
    console.log("---", err);
  }
};
  

module.exports = mongoDB;