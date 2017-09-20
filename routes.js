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

  req.body.currentCities.forEach((city) => {
    
      City.create({
        tag: req.body.tags,
        // user: ,
        locationName: city.locationName,
        arrivalDate: city.dateOfArrival,
        departureDate: city.dateOfDeparture
      }).then((error) => {
        if (error) {
          err = error;
        }
      });
  });

  if (err) {
    res.sendStatus(400);
  } else {
    res.redirect(201, '/viewTrip');
  }

    console.log('req.session.passport', req.session.passport)
//   User.create({
//     user: req.session.passport.user.id
//     tripTags.push(req.body.tags);
//     tripTags: tripTags;
//   }).then((error, trips) => {
//     if (error) {
//       console.log(error);
//       res.sendStatus(400);
//     } else {
//       res.sendStatus(201);
//     }
//   });

});



module.exports = router;