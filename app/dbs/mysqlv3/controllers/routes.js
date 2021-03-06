var pool = require('mysql').pool;

// ADMIN
exports.create = function(req, res, next) {
	
};

// UNREGISTERED
exports.getAll = function(req, res, next) {
	if(req.query.list || req.query.hasOwnProperty('list')) var select = "idroute, name";
	else select = "*";

	pool.query('SELECT ' + select + ' FROM route', function(err, rows, fields) {
		if(err) return next(err);
		
		res.json(rows);
	});
};

exports.get = function(req, res, next) {
	pool.query('SELECT * FROM route WHERE idroute=?', req.params.idroute, function(err, rows, fields) {
		if(err) return next(err);
		
		var route = rows[0];
		if(route) pool.query('SELECT idlocation, city, country, utcoffset, RP.order\
													FROM route, location, routePoints RP\
													WHERE route=? AND idroute=route AND location=idlocation\
													ORDER BY RP.order ASC', req.params.idroute, function(err, rows, fields) {
			if(err) return next(err);

			route.wps = rows;
			res.json(route);
		}); else res.json({});
	});
};


// ADMIN
exports.update = function(req, res, next) {
	pool.query('UPDATE user SET ? WHERE iduser=?', req.body, req.params.idroute, function(err, result) {
		if(err) return next(err);
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res, next) {
	pool.query('DELETE FROM route WHERE idroute=?', req.params.idroute, function(err, result) {
		if(err) return next(err);
		
		res.json({deleted:result.affectedRows});
	});
};

exports.addWaypoint = function(req, res, next) {
	pool.query('INSERT INTO waypoints SET ?', {tripid:req.params.idtrip, userid:req.params.iduser, type:req.body.type}, function(err, result) {
		if(err) return next(err);
		
		res.json({changed:result.changedRows});
	});
};