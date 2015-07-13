var mysql = require('mysql');

exports.create = function(req, res) {
	mysql.pool.query('INSERT INTO trip SET ?',req.body, function(err, result) {
		if(err) throw err;
		
		res.json({id:result.insertId});
	});
};

// AUTHENTICATED
exports.getAll = function(req, res) {

	mysql.pool.query('SELECT trip.idtrip, trip.packages = 1 as packages, car.seats-COUNT(T1.idtrip) AS free,\
							origin.name AS origin,\
							destiny.name AS destiny\
						FROM trip\
							JOIN car ON car.idcar = trip.idcar\
							JOIN location AS origin ON origin.idlocation = trip.origin\
							JOIN location AS destiny ON destiny.idlocation = trip.destiny\
							LEFT JOIN (\
								SELECT idtrip\
								FROM userTrips\
								WHERE userTrips.accepted = true\
							) AS T1\
							ON T1.idtrip = trip.idtrip\
						GROUP BY trip.idtrip',
						function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};

exports.get = function(req, res) {
	//TODO GET ALL THE AVAILABLE INFORMATION OF THE TRIP INSTEAD OF THE RESUMED ONE
	mysql.pool.query('SELECT trip.idtrip, trip.packages = 1 as packages, car.seats-COUNT(T1.idtrip) AS free,\
							origin.name AS origin,\
							destiny.name AS destiny\
						FROM trip\
							JOIN car ON car.idcar = trip.idcar\
							JOIN location AS origin ON origin.idlocation = trip.origin\
							JOIN location AS destiny ON destiny.idlocation = trip.destiny\
							LEFT JOIN (\
								SELECT idtrip\
								FROM userTrips\
								WHERE userTrips.accepted = true\
							) T1\
							ON T1.idtrip = trip.idtrip\
						WHERE trip.idtrip=?', req.params.idtrip, function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows[0]);
	});
};


// AUTHENTICATED
exports.delete = function(req, res) {
	mysql.pool.query('DELETE FROM trip WHERE idtrip=?', req.params.idtrip, function(err, result) {
		if(err) throw err;
		
		res.json({deleted:result.affectedRows});
	});
};

exports.addPassenger = function(req, res) {
	mysql.pool.query('INSERT INTO userTrips SET ?', {tripid:req.params.idtrip, userid:req.params.iduser}, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};