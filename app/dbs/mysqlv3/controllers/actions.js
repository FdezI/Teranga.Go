var pool = require('mysql').pool;
var db   = require('../mysqlDB');

function getRandomBoolean() { return Math.random() >= 0.5 };

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) { return Math.random() * (max - min) + min; }

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

function getRandomChar() {
	return abc.charAt(getRandomInt(0, abc.length - 1));
}

exports.generate = function(req, res, next) {
	var mode = req.params.mode;
	if(mode) {
		console.log("ENTRA");
		var amount = req.query.amount;
		if(!amount) amount = 1;
		
		var response = [];
		for(var i = 0; i < amount; i++) response.push(exports["generate" + mode.capitalize()](req, res, next));
	}
};

exports.generateCar = function(req, res, next) {
	var car = {};

	car.idcar = getRandomInt(1000, 9999) + getRandomChar() + getRandomChar();
	car.seats = getRandomInt(2, 6);
	car.model = "Model " + getRandomInt(0, 100);
	car.hp = getRandomInt(40, 500);

	if(res) res.json(car);
	// return car;
};

exports.generateUser = function(req, res, next) {
	var user = {};

	user.name = "Usuario" + getRandomInt(0, 100);
	user.surnames = getRandomChar() + getRandomChar() + getRandomInt(0, 9999) + " " + getRandomChar() + getRandomChar() + getRandomInt(0, 9999);
	user.email = user.name + user.surnames.split(" ")[getRandomInt(0, 1)] + "@" + getRandomInt(0,9) + "mail.com";
	user.carnet = getRandomBoolean();
	user.password = "asdfasdf";
	user.phone = "6" + getRandomInt(1111111,9999999);
	user.birth = "19" + getRandomInt(10, 99) + "-" + getRandomInt(0,12) + "-" + getRandomInt(1,28);

	if(res) res.json(user);
	// return user;
};

exports.generateRoute = function(req, res, next) {
	var route = {};
	route.name = "Ruta" + getRandomChar() + getRandomInt(0, 999) + getRandomChar();

	route.wps = [];

	pool.query('SELECT GROUP_CONCAT(idlocation) locations FROM location GROUP BY country', function(err, rows, fields) {
		if(err) return next(err);

		var locations = rows;

		var sign = getRandomBoolean() ? 1 : -1;
		var country1 = getRandomInt(0, locations.length - 1);
		var country2 = getRandomInt(0, locations.length - 1);
		if(country2 == country1) country2 += country2 < locations.length -1 ? 1 : -1;

		var c1Locs = locations[country1].locations.split(",");
		var c2Locs = locations[country2].locations.split(",");
		var cXLocs = [];

		for(var i = 0; i < locations.length; i++) {
			if(i != country1 && i != country2) {
				var locs = locations[i].locations.split(",");
				for(var k = 0; k < locs.length; k++) cXLocs.push(locs[k]);
			}
		}
		
		var starts = getRandomInt(1, c1Locs.length - 1);
		var ends = getRandomInt(1, c2Locs.length - 1);
		// var min = starts + ends;

		var max = 0;
		for(var i = 0; i < locations.length; i++)
			max += locations[i].locations.split(",").length;


		max -= (starts + ends);

		var wpsAmount = getRandomInt(0, max > 4 ? 4 : max);

		for(var i = 0; i < starts; i++) {
			var wp = {};
			wp.location = c1Locs.pop(getRandomInt(0, c1Locs.length - 1));
			wp.order = 1;

			route.wps.push(wp);
		}

		for(var i = 0; i < ends; i++) {
			var wp = {};
			wp.location = c2Locs.pop(getRandomInt(0, c2Locs.length - 1));
			wp.order = wpsAmount + 2;

			route.wps.push(wp);
		}

		for(var i = 0; i < wpsAmount; i++) {
			var wp = {};
			if(i < wpsAmount/2 && c1Locs.length > 0)
				wp.location = c1Locs.pop(getRandomInt(0, c1Locs.length - 1));
			else if(getRandomBoolean() && cXLocs.length > 0)
				wp.location = cXLocs.pop(getRandomInt(0, cXLocs.length - 1));
			else if(c2Locs.length > 0)
				wp.location = c2Locs.pop(getRandomInt(0, c2Locs.length - 1));
			else
				wp.location = cXLocs.length > 0 ? cXLocs.pop(getRandomInt(0, cXLocs.length - 1)) : null;

			wp.order = i + 2;
			route.wps.push(wp);
		}

		// return route;
		res.json(route);
	});
};

exports.generateTrip = function(req, res, next) {
	pool.query('SELECT GROUP_CONCAT(iduser) as ids\
							FROM user\
								JOIN owners ON owner = iduser', function(err, rows, fields) {
		if(err) return next(err);	

		var users = rows[0].ids.split(",");

		var trip = {};

		trip.driver = users[getRandomInt(0, users.length - 1)];

		pool.query('SELECT GROUP_CONCAT(idcar) as ids, GROUP_CONCAT(seats) as seats\
							FROM owners\
								JOIN car ON idcar = car\
							WHERE owner = ?', trip.driver, function(err, rows, fields) {
			if(err) return next(err);

			if(rows.length == 0 || !rows[0].ids) {
				res.json("El usuario no tiene coche para realizar un viaje");
				return;
			}

			var cars = rows[0].ids.split(",");
			var seats = rows[0].seats.split(",");
			// var locations = ;
			
			var index = getRandomInt(0, cars.length - 1);
			trip.car = cars[index];
			trip.seats = getRandomInt(1, seats[index]);
			trip.packages = getRandomBoolean();
			trip.animals = getRandomBoolean();

			if(getRandomBoolean()) {
				var comment = "";
				for(var i = 0; i < 30; i++) comment += getRandomChar();
				trip.comment = "Este es un mensaje random '" + comment + "' fin";
			}


			pool.query('SELECT GROUP_CONCAT(idroute) as ids FROM route', function(err, rows, fields) {
				if(err) return next(err);
				var routes = rows[0].ids.split(",");

				pool.query('SELECT GROUP_CONCAT(location) as ids, GROUP_CONCAT(RP.order) as orders FROM routePoints RP WHERE route=? ORDER BY RP.order ASC', routes[getRandomInt(0, routes.length - 1)],
					function(err, rows, fields) {
						if(err) return next(err);

						var locations = rows[0].ids.split(",");
						var orders = rows[0].orders.split(",");

						var amount = locations.length;
						var lastOrder;
						var groups = [];
						var lastGroup = -1;
						for(var i = 0; i < amount; i++) {
							var order = orders[i];
							if(lastOrder != order) {
								groups.push([]);
								lastGroup++;
							}
							groups[lastGroup].push(locations[i]);
							lastOrder = order;
						}


						

						var length = groups.length;
						var wps = trip.wps = Array(length);
						var ccost = 0;
						for(var i = 0; i < length; i++) {
							var wp = wps[i] = {};
							var address = "";
							for(var k = 0; k < 20; k++) address += getRandomChar();
							wp.address = "c/ random " + address + ", " + (Math.random() > 0.95 ? "S/N" : "nº" + getRandomInt(1, 99));
							wp.cost = ccost;
							wp.stop = (i == 0 || (i == length - 1) ? true : getRandomBoolean());
							wp.location = groups[i][getRandomInt(0, groups[i].length - 1)];

							ccost += getRandomInt(23, 135);
						}

						// return trip;

						if(req.query.hasOwnProperty('save') && req.query !== false && req.query !== 0) {
							console.log(req.query.save);
							req.body = trip;
							db.tripController.create(req, res, next);
						} else res.json(trip);

				});
			});
		});

	});
}


