var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
 name: String,
 project: String,
 term: Date,
 state: String
},{
 collection: "task"
});

module.exports = taskSchema;