var mongoose = require('mongoose');
var task = require('../schemas/tasks');

var task = mongoose.model('task',task);
module.exports = task;