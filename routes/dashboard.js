var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../config/auth');

// Controllers.
var job_controller = require('../controllers/jobController');
var tag_controller = require('../controllers/tagController');
var user_controller = require('../controllers/userController');

// GET request to Dashboard page. Protected from when logged out.
router.get('/', ensureAuthenticated, job_controller.index);


/// JOB ROUTES ///

// GET request to view Job Create page.
router.get('/job/create', job_controller.job_create_get);

// POST request to create new Job
router.post('/job/create', job_controller.job_create_post);

// GET request to delete Job.
router.get('/job/:id/delete', job_controller.job_delete_get);

// POST request to delete Job.
router.post('/job/:id/delete', job_controller.job_delete_post);

// GET request to update Job
router.get('/job/:id/update', job_controller.job_update_get);

// POST request to update Job
router.post('/job/:id/update', job_controller.job_update_post);

// GET request for one Job
router.get('/job/:id', job_controller.job_detail);

// GET request for list of all Jobs.
router.get('/jobs', job_controller.job_list);


/// USER ROUTES ///

// GET request to update user profile
router.get('/user/:id/update', user_controller.user_update_get);

// POST request to update user profile
router.post('/user/:id/update', user_controller.user_update_post);

// GET request for one user
router.get('/user/:id', user_controller.user_detail);


/// TAG ROUTES ///

// GET request to view Tag Create page.
router.get('/tag/create', tag_controller.tag_create_get);

// POST request to create new Tag
router.post('/tag/create', tag_controller.tag_create_post);

// GET request to delete Genre.
router.get('/tag/:id/delete', tag_controller.tag_delete_get);

// POST request to delete Genre.
router.post('/tag/:id/delete', tag_controller.tag_delete_post);

// GET request to update Genre.
router.get('/tag/:id/update', tag_controller.tag_update_get);
    
// POST request to update Genre.
router.post('/tag/:id/update', tag_controller.tag_update_post);

// GET request for one Tag.
router.get('/tag/:id', tag_controller.tag_detail);

// GET request for list of all tags
router.get('/tags', tag_controller.tag_list);

module.exports = router;
