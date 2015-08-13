var pool = require('mysql').pool;

exports.create = function(req, res) {
};

exports.getAll = function(req, res) {
	if(req.query.list || req.query.hasOwnProperty('list')) var select = "idlocation, city, country, utcoffset";
	else select = "*";

	if(req.query.route) {
		var sql = 'SELECT ' + select + ', RP.order\
								FROM location, routePoints RP\
								WHERE route=' + pool.escape(req.query.route) + ' AND location=idlocation\
								ORDER BY RP.order ASC';
	} else sql = 'SELECT ' + select + ' FROM location';

	pool.query(sql, function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};

exports.get = function(req, res) {
	pool.query('SELECT * FROM location WHERE idlocation=?', req.params.idlocation , function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};

exports.update = function(req, res) {
};

exports.delete = function(req, res) {
};