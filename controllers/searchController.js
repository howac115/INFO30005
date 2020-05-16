var Job = require("../models/job");
var User = require("../models/user");
var async = require("async");

// Display the dashboard page for all jobs and tags.
exports.index = function (req, res) {
  if (req.query.search) {
    var noMatch = null;
    const regex = new RegExp(escapeRegex(req.query.search), "gi");
    // Get all jobs from DB
    Job.find({ title: regex }, function (err, allJobs) {
      if (err) {
        console.log(err);
      } else {
        if (allJobs.length < 1) {
          noMatch = "No jobs match that query, please try again.";
        } else {
          noMatch = " ";
        }
        res.render("dashboard", {
          current_user: req.user,
          searchJobs: allJobs,
          noMatch: noMatch,
        });
      }
    });
  } else {
    async.parallel(
      {
        featured_jobs: function (callback) {
          Job.aggregate([{ $sample: { size: 6 } }]).exec(callback);
        },
        current_user: function (callback) {
          User.findById(req.user.id).populate("followed_tag").exec(callback);
        },
      },
      function (err, results) {
        if (err) {
          return next(err);
        }
        res.render("dashboard", {
          current_user: results.current_user,
          jobs: results.featured_jobs,
        });
      }
    );
  }
};

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
