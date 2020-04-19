var User = require('../models/user')
var Job = require('../models/job');
var Tag = require('../models/tag');
var async = require('async')

// Display list of all jobs.
exports.job_list = function(req, res, next) {

    Job.find({}, 'title user')
      .populate('user').exec(function (err, list_jobs) {
        if (err) {return next(err)} 
        else {
              // Successful, so render
              res.render('job_list', { title: 'Job List', user: req.user, job_list:  list_jobs});
          }
      });
  
};

// Display detail page for a specific job
exports.job_detail = function(req, res, next) {

    async.parallel({
        job: function(callback) {

            Job.findById(req.params.id)
              .populate('user')
              .populate('tag')
              .exec(callback);
        },

    }, function(err, results) {
        if (err) { return next(err); }
        if (results.job==null) { // No results.
            var err = new Error('Job not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('job_detail', { title: 'Title', user: req.user, job:  results.job } );
    });

};

// Display Job create form on GET
exports.job_create_get = function(req, res, next) {

    // Get all tags for jobs
    async.parallel({
        tags: function(callback) {
            Tag.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('job_create', { title: 'Post Job', user: req.user, tags: results.tags });
    })
}

// Handle Job create on POST
exports.job_create_post = function(req, res, next) {

    // Convert the tag into an array
    (req, res, next) => {
        if(!(req.body.tag instanceof Array)) {
            if (typeof req.body.tag=='undefined')
            req.body.tag=[];
            else
            req.body.tag=new Array(req.body.tag);
        }
        next();
    }

    const { title, description, user, date } = req.body;
    let errors = [];

    if ( !title || !description ) { 
        errors.push( {msg:'Please enter all fields'} ) 
    };

    var newJob = new Job({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id,
        tag: req.body.tag
    })

    if (errors.length > 0) {
        res.render('job_create', {
            errors,
            title,
            description,
            user
        });

        // Mark our selected genres as checked.
        for (let i = 0; i < results.genres.length; i++) {
            if (book.genre.indexOf(results.genres[i]._id) > -1) {
                results.genres[i].checked='true';
            }
        }

    } else {
        newJob
            .save()
            .then(tag => {
                res.redirect('/dashboard');
            })          
    }
}
