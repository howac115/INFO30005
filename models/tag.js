var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TagSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 1, 
        max: 100
    },
    popularity: {
      type: Number
    }
});

// Virtual for this genre instance URL.
TagSchema
.virtual('url')
.get(function () {
  return '/dashboard/tag/'+this._id;
});

// Export model.
module.exports = mongoose.model('Tag', TagSchema);
