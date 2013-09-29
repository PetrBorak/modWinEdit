var mongoose = require('mongoose');
var projectAbra  = require('../schemas/projectAbra');

var projectAbra = mongoose.model('projectAbra', projectAbra);
module.exports = projectAbra;