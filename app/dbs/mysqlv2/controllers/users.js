var mysql = require('mysql');

// UNREGISTERED
exports.create = function(req, res) {
	console.log("-----------------------------------------");
	console.log(req.body);
	mysql.pool.query('INSERT INTO user SET ?', req.body, function(err, result) {
		if(err) throw err;
		
		res.json({id:result.insertId});
	});
};

exports.getAll = function(req, res) {
	mysql.pool.query('SELECT name, surnames, avatar, karma FROM user', function(err, rows, fields) {
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

		var identifiers = req.query;
		var user = req.params.iduser;
		if(Object.keys(req.query).length == 0) {
			console.log(1);
			identifiers = ['name', 'surnames', 'avatar', 'birth', 'karma'];
		} else identifiers = req.query;
		
		mysql.pool.query('SELECT ?? FROM user WHERE user.iduser=?', [identifiers, user], function(err, rows, fields) {
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

	// SECOND METHOD:

	// var query = '(SELECT GROUP_CONCAT(city ORDER BY TP.order ASC) AS points, false as driving\
	// 	FROM userTrips, tripPoints AS TP, location\
	// 	WHERE user = ? AND (userTrips.trip = TP.trip AND (pointA = TP.order OR pointB = TP.order)) AND location = idlocation)\
	// 	UNION DISTINCT\
	// 	(SELECT GROUP_CONCAT(city ORDER BY TP.order ASC), true AS driving\
	// 	FROM trip, tripPoints AS TP, location\
	// 	WHERE trip.driver = ? AND (idtrip = trip AND (TP.order = 0 OR TP.order = 99)) AND location = idlocation\
	// 	GROUP BY idtrip)'
	
	// This method is returning: [{points: "pointA, pointB", driving: 0}, {...}]


	// FIRST METHOD

	var query = '(SELECT LA.city AS departure, LB.city arrival, false as driving\
											FROM userTrips\
												LEFT JOIN tripPoints AS TA ON userTrips.trip = TA.trip AND pointA = TA.order\
												LEFT JOIN tripPoints AS TB ON userTrips.trip = TB.trip AND pointB = TB.order\
												INNER JOIN location AS LA ON LA.idlocation = TA.location\
												INNER JOIN location AS LB ON LB.idlocation = TB.location\
											WHERE user=? AND accepted=1)\
											UNION DISTINCT\
											(SELECT LA.city, LB.city, true AS driving\
											FROM trip\
												LEFT JOIN tripPoints AS TA ON idtrip = TA.trip AND TA.order = 0\
												LEFT JOIN tripPoints AS TB ON idtrip = TB.trip AND TB.order = 99\
												INNER JOIN location AS LA ON LA.idlocation = TA.location\
												INNER JOIN location AS LB ON LB.idlocation = TB.location\
											WHERE trip.driver=?)';

	// This method is returning: [{departure: '', arrival: '', driving:0}, {...}]
	mysql.pool.query(query, [req.params.iduser, req.params.iduser], function(err, rows, result) {

		if(err) throw err;
		
		res.json(rows);
	});
};

exports.getAssessments = function(req, res) {
	mysql.pool.query('SELECT a.*, avatar FROM trip JOIN assessment AS a ON a.trip = idtrip\
											JOIN user ON iduser = user\
										WHERE trip.driver = ?', req.params.iduser, function(err, rows, result) {
		if(err) throw err;

		res.json(rows);
	});
}


// AUTHENTICATED
exports.update = function(req, res) {
	mysql.pool.query('UPDATE user SET ? WHERE iduser=?', req.body, req.params.iduser, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res) {
	mysql.pool.query('DELETE FROM user WHERE iduser=?', req.params.iduser, function(err, result) {
		if(err) throw err;
		
		res.json({deleted:result.affectedRows});
	});
};