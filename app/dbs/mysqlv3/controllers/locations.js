var pool = require('mysql').pool;

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
	pool.query('SELECT * FROM location WHERE idlocation=?', req.params.idlocation , function(err, rows, fields) {
		if(err) return next(err);
		
		res.json(rows);
	});
};

exports.update = function(req, res, next) {
};

exports.delete = function(req, res, next) {
};