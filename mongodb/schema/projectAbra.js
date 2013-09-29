var mongoose = require('mongoose');

var projectabraSchema = new mongoose.Schema({
  id: 0,
  name: String,
},{
  collection: "projectabra"
  });

module.exports = projectabraSchema;