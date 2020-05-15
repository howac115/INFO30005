var User = require("../models/user");
var async = require("async");
var Job = require("../models/job");
var Tag = require("../models/tag");

// Display detail page for a specific user.
exports.user_detail_get = function (req, res, next) {
  async.parallel(
    {
      user: function (callback) {
        User.findByIdAndUpdate(req.params.id, { $inc: { popularity: 1 } })
          .populate("tag")
          .exec(callback);
      },
      user_jobs: function (callback) {
        Job.find({ user: req.params.id }, "title description").exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      } // Error in API usage.
      if (results.user == null) {
        // No results.
        var err = new Error("User not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("user_detail", {
        title: "User Detail",
        current_user: req.user,
        user: results.user,
        user_jobs: results.user_jobs,
      });
    }
  );
};

// Display User update form on GET.
exports.user_update_get = function (req, res, next) {
  async.parallel(
    {
      user: function (callback) {
        User.findById(req.params.id).exec(callback);
      },
      tags: function (callback) {
        Tag.find(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.user == null) {
        // No results.
        var err = new Error("User not found");
        err.status = 404;
        return next(err);
      }
      // Success.
      res.render("user_update", {
        title: "Update User",
        current_user: req.user,
        user: results.user,
        tags: results.tags,
      });
    }
  );
};

// Handle User update on POST.
exports.user_update_post = function (req, res, next) {
  // Convert the tag into an array
  (req, res, next) => {
    if (!(req.body.tag instanceof Array)) {
      if (typeof req.body.tag == "undefined") req.body.tag = [];
      else req.body.tag = new Array(req.body.tag);
    }
    next();
  };

  const { email } = req.body;
  let errors = [];

  if (!email) {
    errors.push({ msg: "You must enter your email to login" });
  }

  var user = new User({
    email: req.body.email,
    phone_num: req.body.phone_num,
    profile_img: req.body.profile_img,
    summary: req.body.summary,
    date_of_birth: req.body.date_of_birth,
    tag: req.body.tag,
    followed_tag: req.user.followed_tag,
    emailConsent: req.body.emailConsent,
    _id: req.params.id,
  });

  if (errors.length > 0) {
    res.render("user_update", {
      errors,
      email,
      phone_num,
      profile_img,
    });

    // Mark our selected tags as checked.
    for (let i = 0; i < results.tags.length; i++) {
      if (job.tag.indexOf(results.tags[i]._id) > -1) {
        results.tags[i].checked = "true";
      }
    }
  } else {
    // Data from form is valid. Update the record.
    User.findByIdAndUpdate(req.params.id, user, {}, function (err, theUser) {
      if (err) {
        return next(err);
      }
      // Successful - redirect to the user detail page.
      res.redirect(theUser.url);
    });
  }
};
