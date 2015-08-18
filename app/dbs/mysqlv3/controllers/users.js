var pool = require('mysql').pool;

// UNREGISTERED
exports.create = function(req, res, next) {
	console.log(req.body);
	var password = req.body.password; delete req.body.password;

	pool.query('INSERT INTO user SET ?, `password`=UNHEX(SHA2(?, 256))', [req.body, password], function(err, result) {
		if(err) return next(err);
		
		res.json({id:result.insertId});
	});
};

exports.getAll = function(req, res, next) {
	pool.query('SELECT iduser, name, surnames, avatar, karma FROM user', function(err, rows, fields) {
		if(err) {
			return next(err);
			//TODO handle errors on server.js
// 			res.json({error:true});
// 			return;
		}
		
		res.json(rows);
	});
// 	if('exp' in req.query)
};

exports.get = function(req, res, next) {
	if(!('exp' in req.query)) {

		if(Object.keys(req.query).length == 0)
			var identifiers = 'iduser, name, surnames, email, phone, carnet = 1 as carnet, avatar, birth, karma';
		else identifiers = pool.escapeId(req.query);
		
		pool.query('SELECT ' + identifiers + ', karma IS NOT NULL AS driver FROM user WHERE user.iduser=?', req.params.iduser, function(err, rows, fields) {
			if(err) return next(err);

			res.json(rows[0]);
		});
	} else {

	}



	// mysql.pool.query('SELECT * FROM user WHERE user.iduser=?', req.params.iduser, function(err, rows, fields) {
	// 	if(err) return next(err);
	// 	console.log("ROWS: " + rows);
		
	// 	var user = rows[0];
	// 	delete rows[0].password;

	// 	mysql.pool.query('SELECT * FROM car WHERE iduser=?', req.params.iduser, function(err, rows, fields) {
	// 		user.cars = rows;
			
	// 		if(rows.length > 0) {
	// 			var cars = Array(rows.length);
	// 			for(car in rows) cars.push(car.idcar)
				
	// 			mysql.pool.query('SELECT * FROM trip WHERE idcar IN (?)', cars, function(err, rows, fields) {
	// 				user.trips = rows;
	// 				res.json(user);
	// 			});
	// 		} else res.json(user);
	// 	});
		
	// 	//res.json(rows[0]);
	// });
};

exports.getTrips = function(req, res, next) {
	// TODO: benchmark both ways and choose the best one.

	// SECOND METHOD (Date not verified):

	// var query = '(SELECT GROUP_CONCAT(city ORDER BY TP.order ASC) AS points, TP.date as dtime, false as driving\
	// 	FROM userTrips, tripPoints AS TP, location\
	// 	WHERE user = ? AND (userTrips.trip = TP.trip AND (pointA = TP.order OR pointB = TP.order)) AND location = idlocation)\
	// 	UNION DISTINCT\
	// 	(SELECT GROUP_CONCAT(city ORDER BY TP.order ASC), trip.date, true AS driving\
	// 	FROM trip, tripPoints AS TP, location\
	// 	WHERE trip.driver = ? AND ((TP.order = 0 OR TP.order = 99) AND idtrip = trip) AND location = idlocation\
	// 	GROUP BY idtrip)'
	
	// This method is returning: [{points: "pointA, pointB", dtime: null, driving: 0}, {...}]


	// FIRST METHOD

	var user = req.params.iduser;
	var query = '(SELECT LA.city AS departure, LB.city arrival, PA.date as dtime, PB.date as atime, false as driving\
											FROM userTrips\
												LEFT JOIN tripPoints PA ON userTrips.trip = PA.trip AND pointA = PA.order\
												LEFT JOIN tripPoints PB ON userTrips.trip = PB.trip AND pointB = PB.order\
												INNER JOIN location LA ON LA.idlocation = PA.location\
												INNER JOIN location LB ON LB.idlocation = PB.location\
											WHERE user=?)\
											UNION DISTINCT\
											(SELECT LA.city, LB.city, PA.date, PB.date, true\
											FROM trip\
												LEFT JOIN tripPoints PA ON PA.order = 0 AND idtrip = PA.trip \
												LEFT JOIN tripPoints PB ON PB.order = 99 AND idtrip = PB.trip\
												INNER JOIN location LA ON LA.idlocation = PA.location\
												INNER JOIN location LB ON LB.idlocation = PB.location\
											WHERE trip.driver=?)';

	// This method is returning: [{departure: '', arrival: '', dtime: null, driving: 0}, {...}]
	pool.query(query, [user, user], function(err, rows, result) {

		if(err) return next(err);
		
		res.json(rows);
	});
};

exports.getAssessments = function(req, res, next) {
	pool.query('SELECT a.*, avatar FROM trip JOIN assessment AS a ON a.trip = idtrip\
											JOIN user ON iduser = user\
										WHERE trip.driver = ?', req.params.iduser, function(err, rows, result) {
		if(err) return next(err);

		res.json(rows);
	});
};

exports.getCars = function(req, res, next) {
	pool.query('SELECT car.*, COUNT(O2.car) as owners\
							FROM owners AS O\
								JOIN car ON idcar = O.car\
								JOIN owners AS O2 ON O2.car = idcar\
							WHERE O.owner = ? GROUP BY idcar', req.params.iduser, function(err, rows, fields) {
		if(err) return next(err);

		res.json(rows);
	});
};

exports.getPackages = function(req, res, next) {
	var user = req.params.iduser;
	pool.query("SELECT idpackage, P.name, size, P.description, if(P.emitter = ?, 'emitter', 'receiver') 'is', iduser as other, U.name as otherName, if(COUNT(PT.package) > 0, if(T.expiration < NOW(), 'done', 'accepted'), if(COUNT(PR.package) > 0, if(T.expiration < NOW(), 'expired', 'pending'), 'waiting')) status\
							FROM package P\
								LEFT JOIN user U ON iduser = if(P.emitter = ?, receiver, emitter)\
								LEFT JOIN packageTrips PT ON PT.package = idpackage\
								LEFT JOIN packageRequests PR ON PR.package = idpackage\
								LEFT JOIN trip T ON idtrip = PT.trip OR idtrip = PR.trip\
							WHERE emitter = ? OR receiver = ?\
							GROUP BY idpackage", [user, user, user, user], function(err, rows, fields) {
		if(err) return next(err);

		res.json(rows);
	});
};

exports.getFavorites = function(req, res, next) {
	var user = req.params.iduser;
	pool.query("SELECT iduser, name, surnames, karma, karma IS NOT NULL AS driver FROM favorites\
								JOIN user ON iduser=user2\
							WHERE user1=?", user, function(err, rows, fields) {
		if(err) return next(err);

		res.json(rows);
	});
};

exports.getRequests = function(req, res, next) {
	var user = pool.escape(req.params.iduser);
	pool.query("SELECT idtrip, R.pointA, R.pointB, LA.city departure, LB.city arrival, driver, travels = 1 as travels\
											,PA.date dtime, LA.utcoffset dutcoffset, COUNT(package) packages\
											,(CASE WHEN R.user = " + user + " THEN (SELECT CONCAT_WS(' ', name, surnames) FROM user WHERE iduser=driver) ELSE 'You' END) driverName\
							FROM requests R\
								LEFT JOIN tripPoints PA ON PA.trip = R.trip AND PA.order = R.pointA\
								LEFT JOIN tripPoints PB ON PB.trip = R.trip AND PB.order = R.pointB\
								INNER JOIN location LA ON LA.idlocation = PA.location\
								INNER JOIN location LB ON LB.idlocation = PB.location\
								INNER JOIN trip T ON idtrip = R.trip\
								LEFT JOIN packageRequests PR ON PR.trip = R.trip AND PR.user = R.user\
							WHERE R.user = " + user + " OR R.trip IN (SELECT idtrip FROM trip WHERE driver=" + user + ")\
							GROUP BY R.trip, R.user", function(err, rows, fields) {
		if(err) return next(err);

		res.json(rows);
	});
};

exports.getNotifications = function(req, res, next) {
	var user = pool.escape(req.params.iduser);
	var since = req.query.since;

	pool.query('SELECT idnotification, emitter, name eName, receiver, type, date, object, N.read = 1 as "read"\
								FROM notification N\
									JOIN user ON iduser = emitter\
								WHERE receiver=' + user + (since ? " AND date>=" + pool.escape(since) : ""), function(err, rows, fields) {
		if(err) return next(err);

		res.json(rows);
	});
}

// AUTHENTICATED
exports.update = function(req, res, next) {
	pool.query('UPDATE user SET ? WHERE iduser=?', [req.body, req.params.iduser], function(err, result) {
		if(err) return next(err);
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res, next) {
	pool.query('DELETE FROM user WHERE iduser=?', req.params.iduser, function(err, result) {
		if(err) return next(err);
		
		res.json({deleted:result.affectedRows});
	});
};