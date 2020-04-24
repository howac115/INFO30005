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
        res.render('user_detail', { title: 'User Detail', current_user: req.user, user: results.user, user_jobs: results.user_jobs });
    });

};

// Display User update form on GET.
exports.user_update_get = function (req, res, next) {

    User.findById(req.params.id, function (err, user) {
        if (err) { return next(err); }
        if (user == null) { // No results.
            var err = new Error('User not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('user_update', { title: 'Update User', current_user: req.user, user: user });

    });
};

// Handle User update on POST.
exports.user_update_post = function(req, res, next) {

    var user = new User({

        email: req.body.email,
        phone_num: req.body.phone_num,
        profile_img: req.body.profile_img,
        summary: req.body.summary,
        date_of_birth: req.body.date_of_birth,
        _id: req.params.id

    });

    // Data from form is valid. Update the record.
    User.findByIdAndUpdate(req.params.id, user, {}, function(err, theUser) {
        if (err) { return next(err); }
        // Successful - redirect to the user detail page.
        res.redirect(theUser.url);
    })
    
}
