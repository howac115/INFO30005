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
              res.render('job_list', { title: 'Job List', current_user: req.user, job_list:  list_jobs});
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
        res.render('job_detail', { title: 'Title', current_user: req.user, job:  results.job } );
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
        res.render('job_create', { title: 'Post Job', current_user: req.user, tags: results.tags });
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

        // Mark our selected tags as checked.
        for (let i = 0; i < results.tags.length; i++) {
            if (job.tag.indexOf(results.tags[i]._id) > -1) {
                results.tags[i].checked='true';
            }
        }

    } else {
        newJob.save().then(job => {
                res.redirect(job.url);
        })          
    }
}

// Display job delete form from on GET
exports.job_delete_get = function(req, res, next) {

    async.parallel({
        job: function(callback) {
            Job.findById(req.params.id).populate('user').populate('tag').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.job==null) { // No results.
            res.redirect('/dashboard/jobs');
        }
        // Successful, so render.
        res.render('job_delete', { title: 'Delete Job', current_user: req.user, job: results.job } );
    });

};

// Handle job delete on POST.
exports.job_delete_post = function(req, res, next) {

    // Assume the post has valid id (ie no validation/sanitization).
    async.parallel({
        job: function(callback) {
            Job.findById(req.body.id).populate('user').populate('tag').exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
    
        Job.findByIdAndRemove(req.body.id, function deleteJob(err) {
            if (err) { return next(err); }
            // Success - got to jobs list.
            res.redirect('/dashboard/jobs');
        }); 
    });
};

// Display Job update form on GET.
exports.job_update_get = function(req, res, next) {

    // Get all tags for jobs
    async.parallel({
        tags: function(callback) {
            Tag.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('job_update', { title: 'Update Job', current_user: req.user, tags: results.tags });
    })
}

// Handle Job update on POST.
exports.job_update_post = function(req, res, next) {

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

    var updateJob = new Job({
        title: req.body.title,
        description: req.body.description,
        user: req.user._id,
        tag: req.body.tag,
        _id:req.params.id
    })

    if (errors.length > 0) {
        res.render('job_update', {
            errors,
            title,
            description,
            user
        });

        // Mark our selected tags as checked.
        for (let i = 0; i < results.tags.length; i++) {
            if (job.tag.indexOf(results.tags[i]._id) > -1) {
                results.tags[i].checked='true';
            }
        }

    } else {
        Job.findByIdAndUpdate(req.params.id, updateJob, {}, function (err, theJob) {
            if (err) { return next(err); }
            // Successful - redirect to job detail page
            res.redirect(theJob.url);
        })        
    }
}
