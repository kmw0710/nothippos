var mongoose = require('mongoose');

var citySchema = mongoose.Schema({
  tag: String,
  user: String,
  cityName: String,
  dateOfArrival: Number,
  dateOfDeparture: Number
});

var City = mongoose.model('City', citySchema);
