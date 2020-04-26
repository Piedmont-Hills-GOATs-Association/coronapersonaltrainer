const mongoose = require('mongoose');

const User = mongoose.model('User', new mongoose.Schema({
  username: String,
  email: String,
  height: String,
  weight: String,
  videos: mongoose.Mixed
}));

const File = mongoose.model('Fs.File', new mongoose.Schema({
  filename: String,
  contentType: String,
  length: Number,
  chunkSize: Number,
  uploadDate: Date,
  aliases: mongoose.Mixed,
  metadata: mongoose.Mixed,
  md5: String
}));

module.exports = { User, File }
