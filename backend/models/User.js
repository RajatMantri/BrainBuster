const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    phoneNumber: String,
    email: String,
    userType: String
  });

  module.exports = mongoose.model('user',UserSchema);