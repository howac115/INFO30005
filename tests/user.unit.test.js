var sinon = require('sinon');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
const User = require('../models/user');
var async = require("async");

describe('userController', function () {

    var id = "5e9d056c5e809520449ac27f";

    describe('get one user', function () {
        it("email should contain '@'", function () {
            async.parallel(
                {
                    user: function (callback) {
                        User.findById(id, {}).exec(callback);
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
                    // Successful, so run test.
                    expect(user.email).to.include('@');
                }
            );
        })
        it("should have first name, family name", function () {
            async.parallel(
                {
                    user: function (callback) {
                        User.findById(id, {}).exec(callback);
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
                    // Successful, so run test.
                    expect(user.first_name && user.family_name).to.exist;
                }
            );
        })
        it("password should be longer than 6 characters", function () {
            async.parallel(
                {
                    user: function (callback) {
                        User.findById(id, {}).exec(callback);
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
                    // Successful, so run test.
                    expect(user.password).to.have.length.greaterThan(6);
                }
            );
        })
    })
})
