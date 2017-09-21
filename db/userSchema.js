var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  user: String,
  triptags: []
})

module.exports = mongoose.model('User', userSchema);
