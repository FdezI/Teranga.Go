var pool = require('mysql').pool;

exports.create = function(req, res) {
	pool.query('INSERT INTO trip SET ?',req.body, function(err, result) {
		if(err) throw err;
		
		res.json({id:result.insertId});
	});
};

// AUTHENTICATED
exports.getAll = function(req, res) {

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
	// 						) AS T1\
	// 						ON T1.idtrip = trip.idtrip\
	// 					GROUP BY trip.idtrip',
	// 					function(err, rows, fields) {
	// 	if(err) throw err;
		
	// 	res.json(rows);
	// });
	res.json([])
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

		pool.query('SELECT idtrip, date, driver, car, seats, packages = 1 as packages, animals = 1 as animals\
								FROM trip WHERE idtrip=?', req.params.idtrip, function(err, rows, fields) {
			if(err) throw err;
			
			var trip = rows[0];

			// pool.query('SELECT TP.order, address, L.city, stop = 1 AS stop
			// 						FROM tripPoints AS TP
			// 							JOIN location AS L ON idlocation = location
			// 						WHERE trip = 2;')
				pool.query('SELECT TP.order, address, date, L.city, stop = 1 AS stop,\
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
		});
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