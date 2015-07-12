var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PacketSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	value: { type: Number },
	owner: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	trip: {
		type: Schema.ObjectId,
		ref: 'Trip'
	},
	size: {
		type: Number,
		min: 0,
		max: 5
	}
});

module.exports = mongoose.model('Packet', PacketSchema);