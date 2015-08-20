//TODO HANDLE ERRORS (example: database exceptions) and do not kill the process
// server.js

// BASE SETUP
// =============================================================================

var config     = require('./app/config');
var actions     = require('./app/actions');

// call the packages we need
var express    = require('express');        // call express
var bodyParser = require('body-parser');
// var mongoose   = require('mongoose');

var app        = express();                 // define our app using express
// var db         = require('./app/dbs/mongo/mongoDB');
var db         = require('./app/dbs/' + config.db.name + config.db.version + '/mysqlDB');

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
var FileStore = require('session-file-store')(session);

var sessionMW = session({
		store: new FileStore(), //store: new FileStore(options),
    secret: "-thiß ıs a gø0d K3y T@ sTºr€ seS71.n§", 
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

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
};

function clientErrorHandler(err, req, res, next) {
  if(req.xhr)
    res.status(500).send({ error: 'Something blew up!', whatToDo: 'Contact an administrator' });
  else next(err);
};

function errorHandler(err, req, res, next) {
  res.status(500);
  res.send('error', { error: 'Something blew up!', whatToDo: 'Contact an administrator' });
};



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
	.put(db.userController.update);
	// .delete(db.userController.delete);
	
apiRouter.route('/users/:iduser/cars')
	// .post(db.carController.create)
	.get(db.userController.getCars);
	// .get(db.carController.getAll);
// apiRouter.route('/users/:iduser/cars/:idcar') // Maybe should this be deleted and use unlinked instead
// 	.get(db.carController.get)

apiRouter.route('/users/:iduser/assessments')
	.get(db.userController.getAssessments);

apiRouter.route('/users/:iduser/packages')
	.get(db.userController.getPackages);

apiRouter.route('/users/:iduser/trips')
	.get(db.userController.getTrips);

apiRouter.route('/users/:iduser/favorites')
	.get(db.userController.getFavorites);

apiRouter.route('/users/:iduser/requests')
	.get(db.userController.getRequests);

apiRouter.route('/users/:iduser/notifications')
	.get(db.userController.getNotifications);

// apiRouter.route('/users/:iduser/trips/:idtrip') // Maybe should this be deleted and use unlinked instead
// 	.get(db.tripController.get)
// 	.put(db.tripController.addPassenger);
	
// apiRouter.route('/users/:iduser/packages')
// 	.post(db.userController.create)
// 	.get(db.userController.getAll);
// apiRouter.route('/users/:iduser/packages/:idpackage') // Maybe should this be deleted and use unlinked instead
// 	.get(db.userController.get)
// 	.put(db.userController.update)
// 	.delete(db.userController.delete);

apiRouter.route('/favorites')
	.get(db.favoriteController.getAll)
	.post(db.favoriteController.create)
	.delete(db.favoriteController.delete);
apiRouter.route('/favorites/:iduser')
	.get(db.favoriteController.get);

apiRouter.route('/routes')
	// .post(db.routeController.create)
	.get(db.routeController.getAll);
apiRouter.route('/routes/:idroute')
	.get(db.routeController.get)
	// .get(db.tripUnlinkedController.get)
// 	.post(db.routeController.update)
	// .delete(db.routeController.delete)
	// .put(db.routeController.addWaypoint);	

apiRouter.route('/trips')
	.post(db.tripUnlinkedController.create)
	.get(db.tripUnlinkedController.search);
apiRouter.route('/trips/:idtrip')
	.get(db.tripUnlinkedController.get)
// 	.post(db.tripUnlinkedController.update)
	// .delete(db.tripUnlinkedController.delete)
	// .put(db.tripUnlinkedController.addPassenger);

apiRouter.route('/cars')
	.post(db.carUnlinkedController.create)
	.get(db.carUnlinkedController.getAll);
apiRouter.route('/cars/:idcar')
	.get(db.carUnlinkedController.get)
	.put(db.carUnlinkedController.update)
	.delete(db.carUnlinkedController.delete);

apiRouter.route('/request/travel')
	// .get(db.requestController.getAllTravel)
	.post(db.requestController.requestTravel);
apiRouter.route('/request/accept')
	.post(db.requestController.acceptRequest);

apiRouter.route('/notifications')
	.get(db.notificationController.getAll)
	.put(db.notificationController.markRead);

// apiRouter.route('/request/packet')
	// .get(db.requestController.getAllPacket)
	// .post(db.requestController.requestPacket);

apiRouter.route('/locations')
	.get(db.locationController.getAll);
apiRouter.route('/locations/:idlocation')
	.get(db.locationController.get);
	
apiRouter.route('/packages')
	.get(db.packageController.getAll)
	.post(db.packageController.create);
apiRouter.route('/packages/:idpackage')
	.get(db.packageController.get);

apiRouter.route('/config')
	.get(db.configController.get);
apiRouter.route('/config/:param')
	.get(db.configController.get);

apiRouter.route('/actions')
	.get(actions.getActions);
apiRouter.route('/actions/:action')
	.get(actions.exec);
apiRouter.route('/actions/:action/:mode')
	.get(actions.exec);

	
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api/v' + config.api.version, apiRouter);
// app.use('/components/', express.static(__dirname + '/bower_components/'));
app.use('/', express.static(__dirname + '/public/'));
// app.use('*', function(req, res) {
// 	res.sendfile('./public/index.html');
// });


app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
