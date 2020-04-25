var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');

/* Load user model */
var User = require('../models/user');
var { forwardAuthenticated } = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('home', { 
        title: 'InCuBeTa',
    })
});

/* Login page */
router.get('/login', (req, res) => res.render('login'));

/* Register page */
router.get('/register', (req, res) => res.render('register'));

/* Register handle */
router.post('/register', (req, res) => {
  const { first_name, family_name, email, phone_num, password, password2 } = req.body;
  let errors = [];

  if ( !first_name ) {
    errors.push({ msg: 'Please Enter Your First Name' });
  }
  if ( !family_name ) {
    errors.push({ msg: 'Please Enter Your Family Name' });
  }
  if ( !email ) {
    errors.push({ msg: 'Please Enter Your Email' });
  }
  if ( !phone_num ) {
    errors.push({ msg: 'Please Enter Your Phone Number' });
  }
  if ( !password ) {
    errors.push({ msg: 'Please Choose Your Password' });
  }
  if ( !password2 ) {
    errors.push({ msg: 'Please Re-enter Your Password' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      first_name,
      family_name,
      email,
      phone_num,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          first_name,
          family_name,
          email,
          phone_num,
          password,
          password2
        });
      } else {
        const newUser = new User({
          first_name,
          family_name,
          email,
          phone_num,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                res.redirect('/home/login');
              })
              .catch(err => console.log(err));
          });
        }); 
      }
    });
  }
});


/* Login handle */
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/home/login',
  })(req, res, next);
});

/* Logout handle */
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/home/login');
});

module.exports = router;
