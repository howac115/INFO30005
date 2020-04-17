var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

module.exports = router;
