var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var userSchema = new Schema({

  name: String,
  email: String,
  githubID: String,
  key: String,
  files:[
    {
      type: Schema.ObjectId,
      ref: 'Config',
      default: []
    }
    ]
});


module.exports = mongoose.model('User', userSchema);
