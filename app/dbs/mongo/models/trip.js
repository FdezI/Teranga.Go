var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TripSchema = new Schema({
	origin: {
		type: String,
		required: true
	},
	destination: {
		type: String,
		required: true
	},
	route: {
		type: Schema.ObjectId,
		ref: 'Route',
		required: true
	},
	car: {
		type: Schema.ObjectId,
		ref: 'Car',
		required: true
	},
	accept_packets: {
		type: Boolean
	},
	passengers: [{type: Schema.ObjectId, ref: 'User'}],
	packets: [{type: Schema.ObjectId, ref: 'Packet'}],
	date: {
		type: Date
	}
});

TripSchema.virtual('tripid').get(function () { return this.id; });

module.exports = mongoose.model('Trip', TripSchema);