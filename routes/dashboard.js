var express = require('express');
var router = express.Router();

/* GET job listing page. */
router.get('/', function(req, res, next) {
  res.render('dashboard', { title: 'InCuBeTa' });
});

module.exports = router;
