var Job = require('../models/job');
var Tag = require('../models/tag');
var User = require('../models/user');
var async = require('async');

// Display list of all Tag.
exports.tag_list = function(req, res, next) {
    Tag.find()
      .sort([['name', 'ascending']])
      .exec(function (err, list_tags) {
        if (err) { return next(err); }
        // Successful, so render.
        res.render('tag_list', { title: 'Tag List', list_tags: list_tags, current_user: req.user});
      });
};

// Display detail page for specific Tag.
exports.tag_detail_get = function(req, res, next) {

    async.parallel({
        tag: function(callback) {
            Tag.findByIdAndUpdate(req.params.id, {$inc:{popularity:1}}).exec(callback);
        },

        tag_jobs: function(callback) {
            Job.find({'tag':req.params.id}).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.tag==null) { // No results relating to tag
            var err = new Error('Tag not found');
            err.status = 404;
            return next(err);
        }
        // Successful, render page:
        res.render('tag_detail', { title: 'Tag Detail', current_user: req.user, tag: results.tag, tag_jobs: results.tag_jobs })
    })
}

// Display Tag create form on GET
exports.tag_create_get = function(req, res, next) {
    res.render('tag_create', {title: 'Create Tag', current_user: req.user});
}

// Handle Tag create on POST.
exports.tag_create_post = function(req, res, next) {

    const { name } = req.body;
    let errors = [];

    if (!name) { errors.push( {msg:'Please enter all fields'} ) };

    if (errors.length > 0) {
        res.render('tag_create', {
            errors,
            name
        });
    } else {
        Tag.findOne({name:name}).then(tag => {
            if (tag) {
                errors.push({msg:'Tag already exists'});
                res.render('tag_create', {
                    errors,
                    name
                });
            } else {
                const newTag = new Tag({
                    name
                });
                newTag.save().then(tag => {
                      res.redirect(tag.url);
                })
            }
        })
    }
}

// Display Tag delete form on GET.
exports.tag_delete_get = function(req, res, next) {

    async.parallel({
        tag: function(callback) {
            Tag.findById(req.params.id).exec(callback);
        },
        tag_jobs: function(callback) {
            Job.find({ 'tag': req.params.id }).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.tag==null) { // No results
            res.redirect('/dashboard/tags');
        }
        // Successful - render delete form
        res.render('tag_delete', { title: 'Delete Tag', current_user:req.user, tag: results.tag, tag_jobs: results.tag_jobs });
    })
}

// Handle Tag delete on POST.
exports.tag_delete_post = function(req, res, next) {

    async.parallel({
        tag: function(callback) {
            Tag.findById(req.params.id).exec(callback);
        }, 
        tag_jobs: function(callback) {
            Job.find({'tag': req.params.id}).exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        // Success
        if (results.tag_jobs.length > 0) {
            // Tag has jobs. Render in same way as for GET route.
            res.render('tag_delete', { title: 'Delete Tag', current_user: req.user, tag: results.tag, tag_jobs: results.tag_jobs });
            return;
        } else {
            // Tag has no jobs. Delete object and redirect to the list of tags.
            Tag.findByIdAndRemove(req.body.id, function deleteTag(err) {
                if (err) { return next(err); }
                // Success - go to tags list
                res.redirect('/dashboard/tags');
            })
        }
    })
}

// Display Tag update form on GET.
exports.tag_update_get = function(req, res, next) {

    Tag.findById(req.params.id, function(err, tag) {
        if (err) { return next(err); }
        if (tag==null) { // No results.
            var err = new Error('Tag not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.render('tag_update', { title: 'Update Tag', current_user: req.user, tag: tag });
    });

};

// Handle Tag update on POST.
exports.tag_update_post = function(req, res, next) {

    const { name } = req.body;
    let errors = [];

    if (!name) { errors.push( {msg:'Please enter all fields'} ) };

    var tag = new Tag({

        name: req.body.name,
        _id: req.params.id

    });

    if (errors.length > 0) {
        res.render('tag_update', {
            title: 'Update Tag',
            user: req.user,
            errors,
            name
        });
        return;
    } else {
        // Data from form is valid. Update the record.
        Tag.findByIdAndUpdate(req.params.id, tag, {}, function(err, theTag) {
            if (err) { return next(err); }
            // Successful - redirect to the tag detail page.
            res.redirect(theTag.url);
        })
    }
}