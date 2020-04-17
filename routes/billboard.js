var express = require('express');
var router = express.Router();

/* GET job listing page. */
router.get('/', function(req, res, next) {
  res.render('billboard', { title: 'InCuBeTa' });
});

module.exports = router;
