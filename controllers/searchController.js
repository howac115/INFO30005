var Job = require('../models/job')
var Tag = require('../models/tag')

// Display the dashboard page for all jobs and tags.
exports.index = function(req, res) {
    var noMatch = null;
    if (req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all jobs from DB
        Job.find({title: regex}, function(err, allJobs) {
           if(err){
               console.log(err);
           } else {
              if(allJobs.length < 1) {
                  noMatch = "No jobs match that query, please try again.";
              }
              res.render('dashboard',{ current_user: req.user, jobs:allJobs, noMatch: noMatch });
           }
        });
    } else {
        res.render('dashboard', { current_user: req.user } )
    }
};

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
