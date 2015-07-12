var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RouteSchema = new Schema({
	origins: [{
		type: String,
		required: true
	}],
	destinations: [{
		type: String,
		required: true
	}],
	waypoints: [{
		type: String
	}]
});

module.exports = mongoose.model('Route', RouteSchema);