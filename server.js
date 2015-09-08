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

apiRouter.route('/auth')
	/**
	* Objects:
	*   body:
	*     - email: Email
	*     - password: String
	*   query:
	*     - logout: Boolean
	*   parameters:
	*/
	.post(db.authController.auth);
	
apiRouter.route('/users')
	/**
	 * Objects:
	 *   body:
	 *     - password: String
	 *     - email: Email
	 *     - *
	 *   query:
	 *   parameters:
	 */
	.post(db.userController.create)
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 */
	.get(db.userController.getAll);

apiRouter.route('/users/:iduser')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *     - *
	 *   parameters:
	 *     - iduser: ID
	 */
	.get(db.userController.get)
	/**
	 * Objects:
	 *   body:
	 *     - *
	 *   parameters:
	 *     - iduser: ID
	 *    
	 */
	.put(db.userController.update);
	
apiRouter.route('/users/:iduser/cars')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - iduser: ID
	 */
	.get(db.userController.getCars);

apiRouter.route('/users/:iduser/assessments')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - iduser: ID
	 */
	.get(db.userController.getAssessments);

apiRouter.route('/users/:iduser/packages')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - iduser: ID
	 */
	.get(db.userController.getPackages);

apiRouter.route('/users/:iduser/trips')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - iduser: ID
	 */
	.get(db.userController.getTrips);

apiRouter.route('/users/:iduser/favorites')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - iduser: ID
	 */
	.get(db.userController.getFavorites);

apiRouter.route('/users/:iduser/requests')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - iduser: ID
	 */
	.get(db.userController.getRequests);

apiRouter.route('/users/:iduser/notifications')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *     - since: UTC DateISOString
	 *   parameters:
	 *     - iduser: ID
	 */
	.get(db.userController.getNotifications);

apiRouter.route('/favorites')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 */
	.get(db.favoriteController.getAll)
	/**
	 * Objects:
	 *   body:
	 *     - user1: ID
	 *     - user2: ID
	 *   query:
	 *   parameters:
	 */
	.post(db.favoriteController.create)
	/**
	 * Objects:
	 *   body:
	 *     - user1: ID
	 *     - user2: ID
	 *   query:
	 *   parameters:
	 */
	.delete(db.favoriteController.delete);

apiRouter.route('/favorites/:iduser')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - iduser: ID
	 */
	.get(db.favoriteController.get);

apiRouter.route('/routes')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *     - list: Boolean
	 *   parameters:
	 */
	.get(db.routeController.getAll);

apiRouter.route('/routes/:idroute')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - idroute: ID
	 */
	.get(db.routeController.get)
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - idroute: ID
	 */
	.delete(db.routeController.delete);

apiRouter.route('/trips')
	/**
	 * Objects:
	 *   body:
	 *     - wps: Array({location: ID, address: String, stop: Boolean, date: UTC DateISOString, cost: Float, pkcost: Float})
	 *     - animals: Boolean/Null/None
	 *     - packages: Boolean/Null/None
	 *   query:
	 *   parameters:
	 */
	.post(db.tripUnlinkedController.create)
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *     - origin: ID(Location)
	 *     - destination: ID(Location)
	 *     - offset: Integer/None
	 *     - limit: Integer/None
	 *     - from: UTC DateISOString/None
	 *     - to: UTC DateISOString/None
	 *     - animals: Boolean/Null/None
	 *     - packages: Boolean/Null/None
	 *   parameters:
	 */
	.get(db.tripUnlinkedController.search);

apiRouter.route('/trips/:idtrip')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - idtrip: ID
	 */
	.get(db.tripUnlinkedController.get);

apiRouter.route('/cars')
	/**
	 * Objects:
	 *   body:
	 *     - iduser: ID
	 *     - seats: Integer
	 *     - model: String
	 *     - hp: Integer
	 *   query:
	 *   parameters:
	 */
	.post(db.carUnlinkedController.create)
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 */
	.get(db.carUnlinkedController.getAll);

apiRouter.route('/cars/:idcar')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - idcar: ID
	 */
	.get(db.carUnlinkedController.get)
	/**
	 * Objects:
	 *   body:
	 *     - seats: Integer/None
	 *     - model: String/None
	 *     - hp: Integer/None
	 *   query:
	 *   parameters:
	 *     - idcar: ID
	 */
	.put(db.carUnlinkedController.update)
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - idcar: ID
	 */
	.delete(db.carUnlinkedController.delete);

apiRouter.route('/request/travel')
	/**
	 * Objects:
	 *   body:
	 *     - user: ID
	 *     - trip: ID
	 *     - pointA: Integer(Order)
	 *     - pointB: Integer(Order)
	 *     - travels: Boolean
	 *     - cost: Float
	 *     - packages: Array({package: ID, cost: Float})
	 *   query:
	 *   parameters:
	 */
	.post(db.requestController.requestTravel);

apiRouter.route('/request/accept')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *     - user: ID
	 *     - trip: ID
	 *   parameters:
	 */
	.post(db.requestController.acceptRequest);

apiRouter.route('/notifications')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *     - since: UTC DateISOString
	 *   parameters:
	 */
	.get(db.notificationController.getAll)
	/**
	 * Objects:
	 *   body:
	 *     - emitter: ID(User)
	 *     - receiver: ID(User)
	 *     - notifications: Array(ID(Notification))
	 *   query:
	 *   parameters:
	 */
	.put(db.notificationController.markRead);

apiRouter.route('/locations')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *     - list: Boolean
	 *     - route: ID/None
	 *   parameters:
	 */
	.get(db.locationController.getAll);

apiRouter.route('/locations/:idlocation')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - idlocation: ID/"random"
	 */
	.get(db.locationController.get);
	
apiRouter.route('/packages')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 */
	.get(db.packageController.getAll)
	/**
	 * Objects:
	 *   body:
	 *     - name: String
	 *     - size: Integer
	 *     - emitter: ID(User)
	 *     - receiver: ID(User)/None
	 *   query:
	 *   parameters:
	 */
	.post(db.packageController.create);

apiRouter.route('/packages/:idpackage')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - idpackage: ID
	 */
	.get(db.packageController.get);

apiRouter.route('/config')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 */
	.get(db.configController.get);

apiRouter.route('/config/:param')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *     - KmCost: Boolean
	 *     - KmPkCost: Boolean
	 *     - version: Boolean
	 *     - name: Boolean
	 *     - timezone: Boolean
	 *   parameters:
	 *     - param: "trips"/"api"/"db"
	 */
	.get(db.configController.get);

apiRouter.route('/actions')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 */
	.get(actions.getActions);

apiRouter.route('/actions/:action')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - action: "generate"
	 */
	.get(actions.exec);

apiRouter.route('/actions/:action/:mode')
	/**
	 * Objects:
	 *   body:
	 *   query:
	 *   parameters:
	 *     - action: "generate"
	 *     - mode: "car"/"user"/"route"/"trip"
	 */
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
