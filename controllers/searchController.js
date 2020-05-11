var Job = require('../models/job')
var async = require('async')

// Display the dashboard page for all jobs and tags.
exports.index = function(req, res) {
    if (req.query.search) {
        var noMatch = null;
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all jobs from DB
        Job.find({title: regex}, function(err, allJobs) {
           if(err){
               console.log(err);
           } else {
              if(allJobs.length < 1) {
                  noMatch = "No jobs match that query, please try again.";
              } else {
                  noMatch = " ";
              }
              res.render('dashboard',{ current_user: req.user, jobs:allJobs, noMatch: noMatch });
           }
        });
    } else {
        async.parallel({
            popular_jobs: function (callback) {
                Job.aggregate([{$sample: {size: 5}}]).exec(callback)
            }
        }, function(err, results) {
            if (err) { return next(err); }
            res.render('dashboard', { current_user: req.user, jobs: results.popular_jobs} )
        })
        
    }
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};