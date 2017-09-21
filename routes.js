const express = require('express');
const router = express.Router();
const City = require('./db/citySchema');
const User = require('./db/userSchema');
var app = express();
var bodyParser = require('body-parser')


// router.get('/', function(req, res) {
//   res.redirect('/#/');
// });

router.get('/login',function(req, res) {
  res.redirect('/#/login');
});

router.get('/tagList', function(req, res) {
  User.find({'user': req.session.passport.user.id})
    .then(result => {
      res.send(result[0].tripTags);
    })
})

router.get('/savedTrips', function(req, res) {
  var seek = req.query.tag
  City.find({'tag': seek})
    .then(result => {  
      res.send(result)
    })
})




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


 var session = req.session.passport;
 console.log(session)

  User.findOne({'user': session.user.id}, function(err, data) {
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