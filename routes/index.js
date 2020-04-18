var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../config/auth');

// Home page.
router.get('/', function(req, res) {
  res.redirect('/home');
});

// Dashboard page.
router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard'));

module.exports = router;
