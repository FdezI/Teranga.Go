var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProposalSchema = new Schema({
	origin: {
		type: String,
		required: true
	},
	destination: {
		type: String,
		required: true
	},
	packet: {
		type: Schema.ObjectId,
		ref: 'Packet'
	}
});

module.exports = mongoose.model('Proposal', ProposalSchema);