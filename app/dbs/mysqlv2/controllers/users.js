var pool = require('mysql').pool;

// UNREGISTERED
exports.create = function(req, res) {
	console.log(req.body);
	pool.query('INSERT INTO user SET ?', req.body, function(err, result) {
		if(err) throw err;
		
		res.json({id:result.insertId});
	});
};

exports.getAll = function(req, res) {
	pool.query('SELECT iduser, name, surnames, avatar, karma FROM user', function(err, rows, fields) {
		if(err) {
			throw err;
			//TODO handle errors on server.js
// 			res.json({error:true});
// 			return;
		}
		
		res.json(rows);
	});
// 	if('exp' in req.query)
};

exports.get = function(req, res) {
	if(!('exp' in req.query)) {

		if(Object.keys(req.query).length == 0)
			var identifiers = 'iduser, name, surnames, email, phone, carnet = 1 as carnet, avatar, birth, karma';
		else identifiers = pool.escapeId(req.query);
		
		pool.query('SELECT ' + identifiers + ', karma IS NOT NULL AS driver FROM user WHERE user.iduser=?', req.params.iduser, function(err, rows, fields) {
			if(err) throw err;

			res.json(rows[0]);
		});
	} else {

	}



	// mysql.pool.query('SELECT * FROM user WHERE user.iduser=?', req.params.iduser, function(err, rows, fields) {
	// 	if(err) throw err;
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

exports.getTrips = function(req, res) {
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
	var query = '(SELECT LA.city AS departure, LB.city arrival, PA.date as dtime, PB.date as atime, false as driving, accepted = true as accepted\
											FROM userTrips\
												LEFT JOIN tripPoints AS PA ON userTrips.trip = PA.trip AND pointA = PA.order\
												LEFT JOIN tripPoints AS PB ON userTrips.trip = PB.trip AND pointB = PB.order\
												INNER JOIN location AS LA ON LA.idlocation = PA.location\
												INNER JOIN location AS LB ON LB.idlocation = PB.location\
											WHERE user=? AND accepted=1)\
											UNION DISTINCT\
											(SELECT LA.city, LB.city, PA.date, PB.date, true, true\
											FROM trip\
												LEFT JOIN tripPoints AS PA ON PA.order = 0 AND idtrip = PA.trip \
												LEFT JOIN tripPoints AS PB ON PB.order = 99 AND idtrip = PB.trip\
												INNER JOIN location AS LA ON LA.idlocation = PA.location\
												INNER JOIN location AS LB ON LB.idlocation = PB.location\
											WHERE trip.driver=?)';

	// This method is returning: [{departure: '', arrival: '', dtime: null, driving: 0}, {...}]
	pool.query(query, [user, user], function(err, rows, result) {

		if(err) throw err;
		
		res.json(rows);
	});
};

exports.getAssessments = function(req, res) {
	pool.query('SELECT a.*, avatar FROM trip JOIN assessment AS a ON a.trip = idtrip\
											JOIN user ON iduser = user\
										WHERE trip.driver = ?', req.params.iduser, function(err, rows, result) {
		if(err) throw err;

		res.json(rows);
	});
};

exports.getCars = function(req, res) {
	pool.query('SELECT car.*, COUNT(O2.car) as owners\
							FROM owners AS O\
								JOIN car ON idcar = O.car\
								JOIN owners AS O2 ON O2.car = idcar\
							WHERE O.owner = ? GROUP BY idcar', req.params.iduser, function(err, rows, result) {
		if(err) throw err;

		res.json(rows);
	});
};

exports.getPackages = function(req, res) {
};


// AUTHENTICATED
exports.update = function(req, res) {
	pool.query('UPDATE user SET ? WHERE iduser=?', [req.body, req.params.iduser], function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res) {
	pool.query('DELETE FROM user WHERE iduser=?', req.params.iduser, function(err, result) {
		if(err) throw err;
		
		res.json({deleted:result.affectedRows});
	});
};