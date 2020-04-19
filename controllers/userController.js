var User = require('../models/user')
var async = require('async')
var Job = require('../models/job')

// Display detail page for a specific user.
exports.user_detail = function (req, res, next) {

    async.parallel({
        user: function (callback) {
            User.findById(req.params.id)
                .exec(callback)
        },
        user_jobs: function (callback) {
            Job.find({ 'user': req.params.id }, 'title description')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.user == null) { // No results.
            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('user_detail', { title: 'User Detail', user: results.user, user_jobs: results.user_jobs });
    });

};