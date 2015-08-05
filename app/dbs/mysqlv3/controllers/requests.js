var mysql = require('mysql');


// AUTHENTICATED
exports.requestPacket = function(req, res) {
	mysql.pool.query('SELECT packages FROM trip WHERE idtrip=?', req.body.idtrip, function(err, rows, fields) {
		if(rows[0].packages) mysql.pool.query('INSERT INTO packageTrips SET ?', req.body, function(err, rows, fields) {
			if(err) throw err;
			
			res.json({id:result.insertId});
		}); else res.json({requested:false});
	});
	
};

exports.requestTravel = function(req, res) {
	var tripId = pool.escape(req.body.idtrip);
	var sql = '\
	SELECT null as used, seats FROM userTrips, car, trip WHERE userTrips.idtrip=' + tripId +' AND userTrips.idtrip=trip.idtrip AND trip.idcar=car.idcar AND accepted=true\
	UNION\
	SELECT COUNT(*), null FROM userTrips WHERE idtrip=' + tripId + ' AND accepted=true';
		
	mysql.pool.query(sql, function(err, rows, fields) {
		if(err) throw err;
		
		var used = rows[0].used;
		var total = rows[0].seats;
		if(used < total) mysql.pool.query('INSERT INTO userTrips SET ?', req.body, function(err, rows, fields) {
			if(err) throw err;
			
			res.json({id:result.insertId});
		}); else res.json({requested:false});
		
	});
};

exports.getAllTravel = function(req, res) {
	mysql.pool.query('SELECT * FROM userTrips WHERE accepted=false', function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};

exports.getAllPacket = function(req, res) {
	mysql.pool.query('SELECT * FROM packageTrips WHERE accepted=false', function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};