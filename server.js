//TODO HANDLE ERRORS (example: database exceptions) and do not kill the process
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
// var mongoose   = require('mongoose');

var app        = express();                 // define our app using express
// var db         = require('./app/dbs/mongo/mongoDB');
var db         = require('./app/dbs/mysqlv2/mysqlDB');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// mongoose.connect('mongodb://localhost/tfg');

// var Bear = require('./app/models/bear');
// var bearController = require('./app/controllers/bears');
// var userController = require('./app/controllers/users');
// var authController = require('./app/controllers/auth');
// var carController = require('./app/controllers/cars');
// var tripController = require('./app/controllers/trips');
// var routeController = require('./app/controllers/routes');
// var packetController = require('./app/controllers/packets');
// var requestController = require('./app/controllers/requests');
// 
// var carUnlinkedController = require('./app/controllers/carsUnlinked');
// var tripUnlinkedController = require('./app/controllers/tripsUnlinked');

// SESSIONS

var session = require('express-session');

var sessionMW = session({
    secret: "-this is a g00d K3y T@ sTºr€ seS71.ns", 
//     cookie: {
//         maxAge: new Date(Date.now() + 3600), // 1 hour
//         httpOnly: true,
//         secure: true, // Requires https connection
//     }, 
    // Stores sessions in Mongo DB
//     store: new MongoStore({
//         host: mongo, 
//         port: 27017, 
//         db: 'iod', 
//         collection: 'sessions'
//     }),
    // Gets rid of the annoying deprecated messages
    resave: false, 
    saveUninitialized: false
});

	
app.use(sessionMW);
////////////////////////////////



// ROUTES FOR OUR API
// =============================================================================
var apiRouter = express.Router();              // get an instance of the express Router

// middleware to use for all requests
apiRouter.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
apiRouter.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// apiRouter.route('/bears')
// 	.post(db.bearController.create)
// 	.get(db.bearController.getAll);
// apiRouter.route('/bears/:bear_id')
// 	.get(db.bearController.get)
// 	.post(db.bearController.update)
// 	.delete(db.bearController.delete);

apiRouter.route('/auth')
	.post(db.authController.auth);
	
apiRouter.route('/users')
	.post(db.userController.create)
	.get(db.userController.getAll);
apiRouter.route('/users/:iduser')
	.get(db.userController.get)
	.put(db.userController.update)
	.delete(db.userController.delete);
	
apiRouter.route('/users/:iduser/cars')
	.post(db.carController.create)
	.get(db.userController.getCars);
	// .get(db.carController.getAll);
apiRouter.route('/users/:iduser/cars/:idcar') // Maybe should this be deleted and use unlinked instead
	.get(db.carController.get)
	.put(db.carController.update)
	.delete(db.carController.delete);

apiRouter.route('/users/:iduser/assessments')
	.get(db.userController.getAssessments);

apiRouter.route('/users/:iduser/trips')
// 	.post(db.carController.create)
	// .get(db.tripController.getAll);
	.get(db.userController.getTrips)
apiRouter.route('/users/:iduser/trips/:idtrip') // Maybe should this be deleted and use unlinked instead
	.get(db.tripController.get)
	.put(db.tripController.addPassenger);
	
apiRouter.route('/users/:iduser/packets')
	.post(db.packetController.create)
	.get(db.packetController.getAll);
apiRouter.route('/users/:iduser/packets/:packet_id') // Maybe should this be deleted and use unlinked instead
	.get(db.packetController.get)
	.put(db.packetController.update)
	.delete(db.packetController.delete);
	
apiRouter.route('/routes')
	.post(db.routeController.create)
	.get(db.routeController.getAll);
apiRouter.route('/routes/:idroute')
	.get(db.routeController.get)
	// .get(db.tripUnlinkedController.get)
// 	.post(db.routeController.update)
	.delete(db.routeController.delete)
	.put(db.routeController.addWaypoint);	

apiRouter.route('/trips')
	.post(db.tripUnlinkedController.create)
	.get(db.tripUnlinkedController.search);
apiRouter.route('/trips/:idtrip')
	.get(db.tripUnlinkedController.get)
// 	.post(db.tripUnlinkedController.update)
	.delete(db.tripUnlinkedController.delete)
	.put(db.tripUnlinkedController.addPassenger);

apiRouter.route('/cars')
	.get(db.carUnlinkedController.getAll);
apiRouter.route('/cars/:idcar')
	.get(db.carUnlinkedController.get)
	.put(db.carUnlinkedController.update)
	.delete(db.carUnlinkedController.delete);

apiRouter.route('/request/travel')
	.get(db.requestController.getAllTravel)
	.post(db.requestController.requestTravel);

apiRouter.route('/request/packet')
	.get(db.requestController.getAllPacket)
	.post(db.requestController.requestPacket);

apiRouter.route('/locations')
	.get(db.locationController.getAll);
apiRouter.route('/locations/:idlocation')
	.get(db.locationController.get);
	
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v1', apiRouter);
// app.use('/components/', express.static(__dirname + '/bower_components/'));
app.use('/', express.static(__dirname + '/public/'));
// app.use('*', function(req, res) {
// 	res.sendfile('./public/index.html');
// });






// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
