var mysql = require('mysql');

// ADMIN
exports.create = function(req, res) {
	var route = new Route();
	route.origin = req.body.origin;
	route.destination = req.body.destination;
	if(req.body.waypoints) route.waypoins = req.body.waypoints;
	route.car = req.body.car;
	
	route.save(function(err) {
		if (err) res.send(err);
		 
		res.json({ message: 'Route created!' });
	});
	
	//TODO
};

// UNREGISTERED
exports.getAll = function(req, res) {
	mysql.pool.query('SELECT * FROM route', function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};

exports.get = function(req, res) {
	mysql.pool.query('SELECT * FROM route WHERE idroute=?', req.params.idroute, function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows[0]);
	});
};


// ADMIN
exports.update = function(req, res) {
	mysql.pool.query('UPDATE user SET ? WHERE iduser=?', req.body, req.params.idroute, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res) {
	mysql.pool.query('DELETE FROM route WHERE idroute=?', req.params.idroute, function(err, result) {
		if(err) throw err;
		
		res.json({deleted:result.affectedRows});
	});
};

exports.addWaypoint = function(req, res) {
	mysql.pool.query('INSERT INTO waypoints SET ?', {tripid:req.params.idtrip, userid:req.params.iduser, type:req.body.type}, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};