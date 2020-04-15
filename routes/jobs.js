var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.send('Post your job here');
});

module.exports = router;
