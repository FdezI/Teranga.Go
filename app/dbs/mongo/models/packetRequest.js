var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PacketRequestSchema = new Schema({
	packet: {
		type: Schema.ObjectId,
		ref: 'Packet',
		required: true
	},
	trip: {
		type: Schema.ObjectId,
		ref: 'Trip',
		required: true
	},
	message: { type: String }
});

PacketRequestSchema.index({ packet: 1, trip: 1 });
// PacketRequestSchema.set('autoIndex', false); // TODO: uncomment (disable) on production

module.exports = mongoose.model('PacketRequest', PacketRequestSchema);