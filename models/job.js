var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var JobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  tag: [{ 
    type: ObjectId,
    ref: 'Tag' 
  }],
  date: {
    type: Date,
    default: Date.now
  },
  popularity: {
    type: Number
  }
});

// Virtual for job instance URL.
JobSchema.virtual('url').get(function() {
    return '/dashboard/job/'+this._id;
});

module.exports = mongoose.model('Job', JobSchema);
