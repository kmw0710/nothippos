var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
  tag: String,
  user: String,
  cityName: String,
  dateOfArrival: Number,
  dateOfDeparture: Number
});

module.exports = mongoose.model('City', citySchema);
