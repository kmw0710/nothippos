const express = require('express');
const router = express.Router();
const City = require('./db/citySchema');
const User = require('./db/userSchema');



// router.get('/', function(req, res) {
//   // initial get to landing page
// });

// router.get('/savedTrip', function(req, res) {
//   // res.send all the saved trips from db
// });


router.post('/saveNewTrip', function(req, res) {
  console.log(req.body)

  City.create({
  	// tag: ,
   //  user: ,
    locationName: req.body.locationName,
    arrivalDate: req.body.arrivalDate,
    departureDate: req.body.departureDate
  })

  User.create({

  })

});



module.exports = router;