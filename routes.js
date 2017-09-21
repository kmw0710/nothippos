const express = require('express');
const router = express.Router();
const City = require('./db/citySchema');
const User = require('./db/userSchema');


router.get('/', function(req, res) {
  res.redirect('/#/');
});

router.get('/login',function(req, res) {
  res.redirect('/#/login');
});

router.get('/savedTrips', function(req, res) {
  // User.find({}, function(error, tripName) {
  //   console.log(tripName)
  //   if (error) {
  //     console.log(error);
  //   } 
  // }).then((tripName) => {
  //   res.send(tripName);
  // });
});


router.post('/saveNewTrip', function(req, res) {
  // console.log(req.body)
  let err;
  var session = req.session.passport;

  console.log('current cities', req.body.currentCities)
  req.body.currentCities.forEach((city) => {
    console.log(city);
    
    // console.log('Creating city data')
      City.create({
        tag: req.body.tags,
        user: session.user.id,
        cityName: city.locationName,
        dateOfArrival: city.dateOfArrival,
        dateOfDeparture: city.dateOfDeparture,
        events: city.events
      }).then((error) => {
        if (error) {
          err = error;
        }
      });
  });

  User.findOne({ 'user': session.user.id}, function(err, data) {
    if (err) {
    } else if (!data) {
      User.create({
        user: session.user.id
      });
    } else if (data) {
      var tempTripTags = data.tripTags;
      tempTripTags.push(req.body.tags);

      data.save(error => {
        if (error) {
          err = error;
        } else {
          User.tripTags = tempTripTags;          
        }
      });
    }
  });

  if (err) {
    res.sendStatus(400);
  } else {
    res.redirect(201, '/#/viewTrip');
  } 
});



module.exports = router;