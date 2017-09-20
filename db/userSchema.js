var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  user: String,
  triptags: []
})

var User = mongoose.model('User', userSchema);
