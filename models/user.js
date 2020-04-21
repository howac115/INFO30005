var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  family_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone_num: {
    type: String
  },
  profile_img: {
    type: String
  },
  summary: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Virtual for user "full" name.
UserSchema.virtual('name').get(function() {
  var fullname = '';

  if (this.first_name && this.family_name) {
    fullname = this.family_name + ', ' + this.first_name;
  }

  if (!this.first_name && !this.family_name) {
    fullname = '';
  }
  return fullname;
});

// Virtual for user instance URL.
UserSchema.virtual('url').get(function() {
  return '/dashboard/user/'+this._id;
});

module.exports = mongoose.model('User', UserSchema);
