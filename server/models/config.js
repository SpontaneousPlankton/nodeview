var mongoose = require('mongoose');
var User = require('../models/butlerUser.js');
var Schema = mongoose.Schema;
var relationship = require("mongoose-relationship");

var configSchema = new Schema({
  userID: {type: Schema.ObjectId, ref:'User', childPath: 'files'},
  data: String
});

// configSchema.plugin(relationship, {relationshipPathName: 'userID'});

module.exports = mongoose.model('Config', configSchema);
