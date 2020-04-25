var User = require('./app/userModel'),
    mongoose = require('mongoose'),
    nev = require('email-verification')(mongoose);
mongoose.connect( 'mongodb+srv://haoqic:1234@incubeta-wowel.mongodb.net/INFO30005?retryWrites=true&w=majority');
