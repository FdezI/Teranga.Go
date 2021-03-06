var pool = require('mysql').pool;
var tripConfig = require('../../../config').trips;

exports.create = function(req, res, next) {
	var trip = req.body;
	var wps = trip.wps; delete trip.wps;

	if(!trip || !wps || wps.length < 2) {
		res.json({error:"mensaje de error"});
		return;
	}

	var x = trip.animals;
	if(x === "null" || x === null || x === "") delete trip.animals;
	else trip.animals = x ? 1 : 0;

	x = trip.packages;
	if(x === "null" || x === null || x === "") delete trip.packages;
	else trip.packages = x ? 1 : 0;


	// trip.animals = trip.animals ? 1 : 0;
	// trip.packages = trip.packages ? 1 : 0;


	pool.getConnection(function(err, connection) {
		if(err) {
			connection.release();
      return next(err);
		}
		connection.beginTransaction(function(err) {
			if(err) {
				connection.release();
	      return next(err);
			}

			connection.query('INSERT INTO trip SET ?', trip, function(err, result) {
				if (err) {
		      return connection.rollback(function() {
		      	connection.release();
		        return next(err);
		      });
		    }

		    var length = wps.length;
		    var i = 0;
		    var idtrip = result.insertId;
		    var insertPoint = function() {
		    	var wp = wps[i];
		    	wp.order = (i < length - 1 ? i : 99);

		    	// ATTENTION! - LAST_INSERT_ID() only 'connection safe' so if using the connection for multiple
		    	// 									thread at the same time, use previous result.insertId instead.
					connection.query('INSERT INTO tripPoints SET trip=LAST_INSERT_ID(),?', wps[i], function(err, result) {
						if (err) {
				      return connection.rollback(function() {
				      	connection.release();
				        return next(err);
				      });
				    }

				    if(++i < length) {
				    	insertPoint();
				    	return;
				    }

			 			connection.commit(function(err) {
			        if (err) {
			          return connection.rollback(function() {
			          	connection.release();
			            return next(err);
			          });
			        }

			        connection.release();

			        res.json({id: idtrip});
			      });
					});
				}

				insertPoint();
			});
		});
	});

	// pool.query('INSERT INTO trip SET ?',req.body, function(err, result) {
	// 	if(err) return next(err);
		
	// 	res.json({id:result.insertId});
	// });
};

// AUTHENTICATED
exports.getAll = function(req, res, next) {
	// TODO
	pool.query('SELECT idtrip, karma, car.model, driver as iduser, user.name as driver, user.surnames as driversn, birth, comment, car, T.seats, packages = 1 as packages, animals = 1 as animals\
							FROM trip AS T, car, user\
							WHERE T.car = idcar AND driver = iduser', function(err, rows, fields) {
		if(err) return next(err);
	
		var trips = rows[0];

		if(trips) pool.query('SELECT TP.order, address, L.city, stop = 1 AS stop, cost, pkcost, date,\
													SUM(CASE WHEN pointA = TP.order THEN 1 ELSE 0 END) as up,\
													SUM(CASE WHEN pointB = TP.order THEN 1 ELSE 0 END) as down\
								FROM tripPoints AS TP\
									LEFT JOIN location AS L ON idlocation = location\
									LEFT JOIN (\
												SELECT trip\
													,pointA, pointB\
												FROM userTrips AS ut\
												) AS C ON C.trip = TP.trip AND (C.pointA = TP.order OR C.pointB = TP.order\
									)\
								GROUP BY TP.order\
								ORDER BY TP.order ASC;', function(err, rows, fields) {
			
			trips.wps = rows;

			res.json(trips);

		});
		else res.json({});
	});
	// if(req.query && Object.keys(req.query).length > 0) {
	// 	var offset = Number(req.query.offset);
	// 	if(offset || offset === 0) delete req.query.offset;

	// 	var where = " WHERE ";
	// 	Object.keys(req.query).forEach(function(key) {
 //      where += pool.escapeId(key) + "=" + pool.escape(req.query[key]) + "AND";
 //    });
 //    where = where.substring(0, where.length - 3);
	// } else where = "";


	// pool.query('SELECT idtrip, driver, car, seats, packages = 1 as packages, animals = 1 as animals,\
	// 										TP.order as oA, TP2.order as oB\
	// 						FROM trip AS T\
	// 							JOIN tripPoints AS TP ON TP.stop = true AND TP.order != 99\
	// 							JOIN tripPoints AS TP2 ON TP2.trip = TP.trip AND TP2.stop = true AND TP2.order != 0\
	// 						WHERE idtrip = TP.trip ORDER BY idtrip ASC', function(err, rows, fields) {
	// 	if(err) return next(err);

	// 	var trips = rows;
	// 	var tripIds = trips.map(function(value) {
	// 		return value.idtrip;
	// 	});

	// 	pool.query('SELECT TP.order, address, date, L.city, stop = 1 AS stop,\
	// 								SUM(CASE WHEN pointA = TP.order THEN 1 ELSE 0 END) as up,\
	// 								SUM(CASE WHEN pointB = TP.order THEN 1 ELSE 0 END) as down\
	// 							FROM tripPoints AS TP\
	// 								LEFT JOIN location AS L ON idlocation = location\
	// 								LEFT JOIN (\
	// 											SELECT trip, pointA, pointB\
	// 											FROM userTrips AS ut\
	// 											) AS C ON C.trip = TP.trip AND (C.pointA = TP.order OR C.pointB = TP.order)\
	// 							WHERE TP.trip IN (?)\
	// 							GROUP BY TP.trip, TP.order\
	// 							ORDER BY TP.trip, TP.order ASC;', [tripIds], function(err, rows, fields) {
	// 		if(err) return next(err);

	// 		var i = 0;
	// 		var last;
	// 		rows.forEach(function(value) {
	// 			if(value.order == 0) {
	// 				last = trips[i++];
	// 				last.wps = [];
	// 			}
	// 			last.wps.push(value);
	// 		});
			
			
	// 		res.json(trips);
	// 	});

	// });
};

exports.get = function(req, res, next) {
	//TODO GET ALL THE AVAILABLE INFORMATION OF THE TRIP INSTEAD OF THE RESUMED ONE
	// mysql.pool.query('SELECT trip.idtrip, trip.packages = 1 as packages, car.seats-COUNT(T1.idtrip) AS free,\
	// 						origin.name AS origin,\
	// 						destiny.name AS destiny\
	// 					FROM trip\
	// 						JOIN car ON car.idcar = trip.idcar\
	// 						JOIN location AS origin ON origin.idlocation = trip.origin\
	// 						JOIN location AS destiny ON destiny.idlocation = trip.destiny\
	// 						LEFT JOIN (\
	// 							SELECT idtrip\
	// 							FROM userTrips\
	// 							WHERE userTrips.accepted = true\
	// 						) T1\
	// 						ON T1.idtrip = trip.idtrip\
	// 					WHERE trip.idtrip=?', req.params.idtrip, function(err, rows, fields) {

	var user = req.session.iduser;
	var trip = pool.escape(req.params.idtrip);
	if(user) {
		//,IF(COUNT(UT.user) > 0, if(TP.date < NOW(), 'done', 'accepted'), if(COUNT(R.user) > 0, if(TP.date < NOW(), 'expired', 'pending'), 'waiting')) status\
		var sql = "SELECT idtrip, karma, car.model, driver as iduser, user.name as driver, user.surnames as driversn, phone as driverphn, email as driverml, birth, comment, car, T.seats, packages = 1 as packages, animals = 1 as animals\
							,IF(COUNT(UT.user) > 0, if(TP.date < NOW(), 'done', 'accepted'), if(TP.date < NOW(), 'expired', if(COUNT(R.user) > 0, 'pending', 'waiting'))) status\
							FROM trip T, car, user\
								LEFT JOIN userTrips UT ON UT.trip=" + trip + " AND UT.user=" + user +
								" LEFT JOIN requests R ON R.trip=" + trip + " AND R.user=" + user +
								" JOIN tripPoints TP ON TP.trip = " + trip + " AND TP.order = 99\
							WHERE idtrip=" + trip + " AND T.car = idcar AND driver = iduser"
	} else {
		sql = "SELECT idtrip, karma, car.model, driver as iduser, user.name as driver, user.surnames as driversn, phone as driverphn, email as driverml, birth, comment, car, T.seats, packages = 1 as packages, animals = 1 as animals\
							FROM trip T, car, user\
							WHERE idtrip=" + trip + " AND T.car = idcar AND driver = iduser";
	}
	pool.query(sql, req.params.idtrip, function(err, rows, fields) {
		if(err) return next(err);
	
		var trip = rows[0];

		// pool.query('SELECT TP.order, address, L.city, stop = 1 AS stop
		// 						FROM tripPoints AS TP
		// 							JOIN location AS L ON idlocation = location
		// 						WHERE trip = 2;')
		
		if(trip) pool.query('SELECT idlocation, TP.order, address, L.city, stop = 1 AS stop, cost, pkcost, date,\
													SUM(CASE WHEN pointA = TP.order THEN 1 ELSE 0 END) as up,\
													SUM(CASE WHEN pointB = TP.order THEN 1 ELSE 0 END) as down\
								FROM tripPoints AS TP\
									LEFT JOIN location AS L ON idlocation = location\
									LEFT JOIN (\
												SELECT trip\
													,pointA, pointB\
												FROM userTrips AS ut\
												) AS C ON C.trip = TP.trip AND (C.pointA = TP.order OR C.pointB = TP.order\
									)\
								WHERE TP.trip = ?\
								GROUP BY TP.order\
								ORDER BY TP.order ASC;', req.params.idtrip, function(err, rows, fields) {
			
			trip.wps = rows;

			res.json(trip);

		});
		else res.json({});
	});
};

exports.search = function(req, res, next) {
	var l1 = req.query.origin; delete req.query.origin;
	var l2 = req.query.destination; delete req.query.destination;

	if(!l1 && !l2) {
		// TODO complete and only if admin
		exports.getAll(req, res, next);
		return;
	}

	var where = "";
	if(req.query && Object.keys(req.query).length > 0) {
		var offset = Number(req.query.offset);
		var limit = Number(req.query.limit);
		if(offset || req.query.hasOwnProperty('offset')) delete req.query.offset;//offset === 0) delete req.query.offset;
		if(limit || req.query.hasOwnProperty('limit')) delete req.query.limit;
		else limit = 10;

		Object.keys(req.query).forEach(function(key) {
			var value = pool.escape(req.query[key]);

			if(value != 'undefined' && value.length > 2) {
				console.log("VALUE: " + value);
				where += " AND ";

				if(value != "'null'") {
					if(key == 'from') where += "TP.date >= ";
					else if(key == 'to') where += "TP.date <= ";
	    		else where +=  pool.escapeId(key) + " = ";

	    		where += value;
				} else where += pool.escapeId(key) + " IS null";
	    }
    });
    console.log("WHERE: " + where);
    // where = where.substring(0, where.length - 3);
		// var values = keys.map(function(k) { return req.query[k]; });
	}

	pool.query('SELECT idtrip, driver, U.name driverName, car, seats, packages = 1 as packages, animals = 1 as animals,\
											TP.order as oA, TP2.order as oB\
							FROM trip AS T\
								JOIN tripPoints AS TP ON location = ? AND TP.stop = true AND TP.order != 99\
								JOIN tripPoints AS TP2 ON TP2.trip = TP.trip AND TP2.location = ? AND TP2.stop = true AND TP2.order != 0\
								JOIN user AS U ON iduser = T.driver\
							WHERE idtrip = TP.trip ' + where + ' ORDER BY idtrip ASC LIMIT ?,?',
							[l1, l2, offset ? offset : 0, limit], function(err, rows, fields) {
		if(err) return next(err);

		if(rows.length == 0) {
			res.json([]);
			return;
		}

		var trips = rows;
		var tripIds = trips.map(function(value) {
			return value.idtrip;
		});

		// var perTrip = [];
		// var last;
		// rows.forEach(function(value) {
		// 	if(value.order == 0) {
		// 		last = {};
		// 		perTrip.push(last);
		// 	}

		// 	last.cities.push(value.city);
		// });

		pool.query('SELECT idlocation, TP.order, address, date, L.city, stop = 1 AS stop, cost,\
									SUM(CASE WHEN pointA = TP.order THEN 1 ELSE 0 END) as up,\
									SUM(CASE WHEN pointB = TP.order THEN 1 ELSE 0 END) as down\
								FROM tripPoints AS TP\
									LEFT JOIN location AS L ON idlocation = location\
									LEFT JOIN (\
												SELECT trip, pointA, pointB\
												FROM userTrips AS ut\
												) AS C ON C.trip = TP.trip AND (C.pointA = TP.order OR C.pointB = TP.order)\
								WHERE TP.trip IN (?)\
								GROUP BY TP.trip, TP.order\
								ORDER BY TP.trip, TP.order ASC;', [tripIds], function(err, rows, fields) {
			if(err) return next(err);

			var i = 0;
			var last;
			var stretch = false;
			var currentFree;
			var lesserFree;
			var aCost;
			rows.forEach(function(value) {
				var order = value.order;
				if(order == 0) {
					last = trips[i++];
					// last.wps = [];
					last.cities = [];
					last.date = value.date;
					currentFree = last.seats;
					lesserFree = last.seats;
				}

				if(order === 0 || order === 99 || order === last.oA || order === last.oB) last.cities.push(value.city);

				if(order === last.oA) {
					stretch = true;
					aCost = value.cost;
					last.departure = last.cities.length - 1;
				} else if (order === last.oB) {
					stretch = false;
					last.free = lesserFree;
					last.cost = value.cost - aCost;
					last.arrival = last.cities.length - 1;
					delete last.oA;
					delete last.oB;
				}

				currentFree += value.down - value.up;
				if(currentFree < lesserFree) lesserFree = currentFree;

				// last.wps.push(value);
			});
			
			
			res.json(trips);	
			// res.json(rows);
		});

	});


	// pool.query('SELECT idtrip, driver, car, seats, packages = 1 as packages, animals = 1 as animals\
	// 						FROM trip' + where + 'LIMIT ?,10', offset ? offset : 0, function(err, rows, fields) {
	// 	if(err) return next(err);

	// 	res.json(rows);
	// });
};

// AUTHENTICATED
exports.delete = function(req, res, next) {
	pool.query('DELETE FROM trip WHERE idtrip=?', req.params.idtrip, function(err, result) {
		if(err) return next(err);
		
		res.json({deleted:result.affectedRows});
	});
};

exports.addPassenger = function(req, res, next) {
	pool.query('INSERT INTO userTrips SET ?', {tripid:req.params.idtrip, userid:req.params.iduser}, function(err, result) {
		if(err) return next(err);
		
		res.json({changed:result.changedRows});
	});
};
