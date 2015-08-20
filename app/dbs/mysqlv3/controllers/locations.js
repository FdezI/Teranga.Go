var pool = require('mysql').pool;

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

exports.create = function(req, res, next) {
};

exports.getAll = function(req, res, next) {
	if(req.query.list || req.query.hasOwnProperty('list')) var select = "idlocation, city, country, utcoffset";
	else select = "location.*";

	if(req.query.route) {
		var sql = 'SELECT ' + select + ', RP.order\
								FROM location, routePoints RP\
								WHERE route=' + pool.escape(req.query.route) + ' AND location=idlocation\
								ORDER BY RP.order ASC';
	} else sql = 'SELECT ' + select + ' FROM location';

	pool.query(sql, function(err, rows, fields) {
		if(err) return next(err);
		
		res.json(rows);
	});
};

exports.get = function(req, res, next) {
	var loc = req.params.idlocation;
	var random = (loc == "random");
	var sql = random ? 'SELECT * FROM location' : 'SELECT * FROM location WHERE idlocation=?';
	
	pool.query(sql, loc, function(err, rows, fields) {
		if(err) return next(err);
		
		if(random) res.json(rows[getRandomInt(0, rows.length - 1)]);
		else res.json(rows);
	});
};

exports.update = function(req, res, next) {
};

exports.delete = function(req, res, next) {
};