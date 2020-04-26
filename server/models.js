const mongoose = require('mongoose');

const Users = mongoose.model('Users', new mongoose.Schema({
  username: String,
  email: String,
  height: String,
  weight: String
}));

module.exports = { Users }
