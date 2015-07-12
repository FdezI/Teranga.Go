var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TravelRequestSchema = new Schema({
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	trip: {
		type: Schema.ObjectId,
		ref: 'Trip',
		required: true
	},
	message: { type: String }
});

TravelRequestSchema.index({ user: 1, trip: 1 });
// TravelRequestSchema.set('autoIndex', false); //TODO: uncomment (disable) on production

module.exports = mongoose.model('TravelRequest', TravelRequestSchema);