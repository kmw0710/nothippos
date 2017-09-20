const express = require('express');
const parser = require('body-parser');
const router = require('./routes');
const db = require('./db/config');
const passport = require('passport'), 
FacebookStrategy = require('passport-facebook').Strategy;


const app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
    clientID: 130245780952656,
    clientSecret: '267cc278534da649a7ea1f2ffacebebb',
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
   	done(null, profile);
  }
));

passport.serializeUser(function(profile, done) {
  done(null, profile);
});

passport.deserializeUser(function(profile, done) {
  done(null, profile);
});

app.use(parser.json());

app.use('/scripts', express.static('./node_modules'))
app.use(express.static('./public'));

app.use('/api', router);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/#/login' }), function(req, res) { 
  	res.redirect('/#/')
  });

const port = 3000;

app.listen(port, function() {
  console.log(`Server running, listening on ${port}...`);	
});














