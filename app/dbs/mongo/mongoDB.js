// Imports
var mongoose   = require('mongoose');
//////////

// Configuration
////////////////

// Connection
mongoose.connect('mongodb://localhost/tfg');
/////////////

exports.authController = require('./controllers/auth');
exports.userController = require('./controllers/users');
exports.carController = require('./controllers/cars');
exports.tripController = require('./controllers/trips');
exports.routeController = require('./controllers/routes');
exports.packetController = require('./controllers/packets');
exports.requestController = require('./controllers/requests');

exports.carUnlinkedController = require('./controllers/carsUnlinked');
exports.tripUnlinkedController = require('./controllers/tripsUnlinked');