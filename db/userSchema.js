var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  user: String,
  tripTags: []
})

module.exports = mongoose.model('User', userSchema);
