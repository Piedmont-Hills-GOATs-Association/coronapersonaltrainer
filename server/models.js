const mongoose = require('mongoose');

const Users = mongoose.model('Users', new mongoose.Schema({
  username: String,
  email: String
}));

module.exports = { Users }
