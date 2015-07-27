// Imports
var mysql      = require('mysql');
//////////

// Configuration
mysql.pool = mysql.createPool({
  host     : 'localhost',
  user     : 'tfg',
  password : 'asdfasdf',
  database : 'TFGv2'
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
exports.packetController = require('./controllers/packets');
exports.requestController = require('./controllers/requests');

exports.carUnlinkedController = require('./controllers/cars');
exports.tripUnlinkedController = require('./controllers/trips');