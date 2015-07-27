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
	// mysql.pool.query('SELECT route.*, locations, types\
	// 					FROM route\
	// 					LEFT JOIN (\
	// 						SELECT idroute,\
	// 								GROUP_CONCAT(idlocation) AS locations,\
	// 								GROUP_CONCAT(type) AS types FROM waypoints\
	// 					) AS wps ON wps.idroute = route.idroute',
	// 					function(err, rows, fields) {
	// 	if(err) throw err;
		
	// 	res.json(rows);
	// });
	mysql.pool.query('SELECT * FROM route', function(err, rows, fields) {
		var routes = rows;
		mysql.pool.query('SELECT waypoints.*, name FROM waypoints, location WHERE waypoints.idlocation = location.idlocation', function(err, rows, fields){
			var index = {};
			for(i in routes) {
				var route = routes[i];
				route.waypoints = {'start':[], 'center':[], 'end':[]};
				index[route.idroute] = route;
				// route.waypoints.start = [];
				// route.waypoints.center = [];
				// route.waypoints.end = [];
			}
			var waypoints = rows;
			for(i in waypoints) {
				var waypoint = waypoints[i];
				var rt = index[waypoint.idroute];
				if(rt) {
					wp = rt.waypoints[waypoint.type];
					if(wp) {
						delete waypoint.type;
						delete waypoint.idroute;
						wp.push(waypoint);
					}
				}
			}

			res.json(routes);
		});
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