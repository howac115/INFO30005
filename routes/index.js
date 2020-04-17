var express = require('express');
var router = express.Router();

// Home page.
router.get('/', function(req, res) {
  res.redirect('/home');
});
// Dashboard page.
router.get('/dashboard', (req, res) => res.render('dashboard'));

module.exports = router;
