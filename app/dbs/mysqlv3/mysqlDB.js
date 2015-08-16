// Imports
var mysql      = require('mysql');
//////////

// Configuration
mysql.pool = mysql.createPool({
  host     : 'localhost',
  user     : 'tfg',
  password : 'asdfasdf',
  database : 'TFGv3',
  timezone : '+00:00'
});
/////////////////

// Connection
// connection.connect();
/////////////

// Error handling
mysql.pool.on('error', function(err) {
// 	ER_BAD_FIELD_ERROR
	console.log("ASD --------------------- ASD");
});


exports.authController = require('./controllers/auth');
exports.userController = require('./controllers/users');
exports.carController = require('./controllers/cars');
exports.tripController = require('./controllers/trips');
exports.routeController = require('./controllers/routes');
exports.packageController = require('./controllers/packages');
exports.requestController = require('./controllers/requests');

exports.favoriteController = require('./controllers/favorites');

exports.carUnlinkedController = require('./controllers/cars');
exports.tripUnlinkedController = require('./controllers/trips');

exports.locationController = require('./controllers/locations');

exports.configController = require('./controllers/config');

exports.actionController = require('./controllers/actions');