var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CarSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	model: {
		type: String,
		required: true
	},
	cvv: {
		type: Number
// 		required: true
	},
	seats: {
		type: Number,
		required: true
	},
	owner: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	}
});

module.exports = mongoose.model('Car', CarSchema);