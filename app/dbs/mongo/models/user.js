var mongoose = require('mongoose');
var crypto = require('crypto'); //TODO replace crypto by bcrypt-nodejs for user stored passwords

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	nick: {
		type: String,
		unique: true,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	hashedPassword: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	},
	packets: {
		type: Boolean
	},
	cars: [{
		type: Schema.ObjectId,
		ref: 'Car',
		Required: true
	}],
	trips: [{
		type: Schema.ObjectId,
		ref: 'Trip'
	}],
//    created: {
//        type: Date,
//        default: Date.now
//    }
});

UserSchema.methods.encryptPassword = function(password) {
	return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
	//more secure – return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
};

UserSchema.virtual('iduser').get(function () { return this.id; });

UserSchema.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = crypto.randomBytes(32).toString('base64');
		//more secure - this.salt = crypto.randomBytes(128).toString('base64');
		this.hashedPassword = this.encryptPassword(password);
	})
	.get(function() { return this._plainPassword; });


UserSchema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) === this.hashedPassword;
};

UserSchema.statics.findByEmail = function(mail, cb) {
	return this.findOne({email: mail}, cb);
};


module.exports = mongoose.model('User', UserSchema);
