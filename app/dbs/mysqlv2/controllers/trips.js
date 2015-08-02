var pool = require('mysql').pool;

exports.create = function(req, res) {
	pool.query('INSERT INTO trip SET ?',req.body, function(err, result) {
		if(err) throw err;
		
		res.json({id:result.insertId});
	});
};

// AUTHENTICATED
exports.getAll = function(req, res) {
	if(req.query && Object.keys(req.query).length > 0) {
		var offset = Number(req.query.offset);
		if(offset || offset === 0) delete req.query.offset;

		var where = " WHERE ";
		Object.keys(req.query).forEach(function(key) {
      where += pool.escapeId(key) + "=" + pool.escape(req.query[key]) + "AND";
    });
    where = where.substring(0, where.length - 3);
	} else where = "";


	pool.query('SELECT idtrip, driver, car, seats, packages = 1 as packages, animals = 1 as animals,\
											TP.order as oA, TP2.order as oB\
							FROM trip AS T\
								JOIN tripPoints AS TP ON location = 1 AND TP.stop = true AND TP.order != 99\
								JOIN tripPoints AS TP2 ON TP2.trip = TP.trip AND (TP2.location = 5 OR TP2.location = 3) AND TP2.stop = true AND TP2.order != 0\
							WHERE idtrip = TP.trip ORDER BY idtrip ASC', function(err, rows, fields) {
		if(err) throw err;

		var trips = rows;
		var tripIds = trips.map(function(value) {
			return value.idtrip;
		});

		pool.query('SELECT TP.order, address, date, L.city, stop = 1 AS stop,\
									SUM(CASE WHEN pointA = TP.order THEN 1 ELSE 0 END) as up,\
									SUM(CASE WHEN pointB = TP.order THEN 1 ELSE 0 END) as down\
								FROM tripPoints AS TP\
									LEFT JOIN location AS L ON idlocation = location\
									LEFT JOIN (\
												SELECT trip, pointA, pointB\
												FROM userTrips AS ut\
												WHERE accepted) AS C ON C.trip = TP.trip AND (C.pointA = TP.order OR C.pointB = TP.order)\
								WHERE TP.trip IN (?)\
								GROUP BY TP.trip, TP.order\
								ORDER BY TP.trip, TP.order ASC;', [tripIds], function(err, rows, fields) {
			if(err) throw err;

			var i = 0;
			var last;
			rows.forEach(function(value) {
				if(value.order == 0) {
					last = trips[i++];
					last.wps = [];
				}
				last.wps.push(value);
			});
			
			
			res.json(trips);
		});

	});
};

exports.get = function(req, res) {
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

	pool.query('SELECT idtrip, car.model, driver as iduser, user.name as driver, user.surnames as driversn, birth, comment, car, T.seats, packages = 1 as packages, animals = 1 as animals\
							FROM trip AS T, car, user\
							WHERE idtrip=? AND T.car = idcar AND driver = iduser', req.params.idtrip, function(err, rows, fields) {
		if(err) throw err;
	
		var trip = rows[0];

		// pool.query('SELECT TP.order, address, L.city, stop = 1 AS stop
		// 						FROM tripPoints AS TP
		// 							JOIN location AS L ON idlocation = location
		// 						WHERE trip = 2;')
		
		if(trip) pool.query('SELECT TP.order, address, L.city, stop = 1 AS stop, cost, pkcost, date,\
													SUM(CASE WHEN pointA = TP.order THEN 1 ELSE 0 END) as up,\
													SUM(CASE WHEN pointB = TP.order THEN 1 ELSE 0 END) as down\
								FROM tripPoints AS TP\
									LEFT JOIN location AS L ON idlocation = location\
									LEFT JOIN (\
												SELECT trip\
													,pointA, pointB\
												FROM userTrips AS ut\
												WHERE accepted) AS C ON C.trip = TP.trip AND (C.pointA = TP.order OR C.pointB = TP.order\
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

exports.search = function(req, res) {
	var l1 = req.query.origin; delete req.query.origin;
	var l2 = req.query.destination; delete req.query.destination;
	var where = "";
	if(req.query && Object.keys(req.query).length > 0) {
		var offset = Number(req.query.offset);
		if(offset || offset === 0) delete req.query.offset;

		Object.keys(req.query).forEach(function(key) {
      where += "AND" + pool.escapeId(key) + "=" + pool.escape(req.query[key]);
    });
    // where = where.substring(0, where.length - 3);
		// var values = keys.map(function(k) { return req.query[k]; });
	}

	pool.query('SELECT idtrip, driver, U.name driverName, car, seats, packages = 1 as packages, animals = 1 as animals,\
											TP.order as oA, TP2.order as oB\
							FROM trip AS T\
								JOIN tripPoints AS TP ON location = ? AND TP.stop = true AND TP.order != 99\
								JOIN tripPoints AS TP2 ON TP2.trip = TP.trip AND TP2.location = ? AND TP2.stop = true AND TP2.order != 0\
								JOIN user AS U ON iduser = T.driver\
							WHERE idtrip = TP.trip ' + where + ' ORDER BY idtrip ASC LIMIT ?,10',
							[l1, l2, offset ? offset : 0], function(err, rows, fields) {
		if(err) throw err;

		if(rows.length == 0) {
			res.json({});
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

		pool.query('SELECT TP.order, address, date, L.city, stop = 1 AS stop, cost,\
									SUM(CASE WHEN pointA = TP.order THEN 1 ELSE 0 END) as up,\
									SUM(CASE WHEN pointB = TP.order THEN 1 ELSE 0 END) as down\
								FROM tripPoints AS TP\
									LEFT JOIN location AS L ON idlocation = location\
									LEFT JOIN (\
												SELECT trip, pointA, pointB\
												FROM userTrips AS ut\
												WHERE accepted) AS C ON C.trip = TP.trip AND (C.pointA = TP.order OR C.pointB = TP.order)\
								WHERE TP.trip IN (?)\
								GROUP BY TP.trip, TP.order\
								ORDER BY TP.trip, TP.order ASC;', [tripIds], function(err, rows, fields) {
			if(err) throw err;

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
				} else if (order === last.oB) {
					stretch = false;
					last.free = lesserFree;
					last.cost = value.cost - aCost;
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
	// 	if(err) throw err;

	// 	res.json(rows);
	// });
};

// AUTHENTICATED
exports.delete = function(req, res) {
	pool.query('DELETE FROM trip WHERE idtrip=?', req.params.idtrip, function(err, result) {
		if(err) throw err;
		
		res.json({deleted:result.affectedRows});
	});
};

exports.addPassenger = function(req, res) {
	pool.query('INSERT INTO userTrips SET ?', {tripid:req.params.idtrip, userid:req.params.iduser}, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};