var pool = require('mysql').pool;

exports.create = function(req, res) {
};

exports.getAll = function(req, res) {
	if(req.query.list || req.query.hasOwnProperty('list')) var select = "idlocation, city";
	else select = "*";

	pool.query('SELECT ' + select + ' FROM location', function(err, rows, fields) {
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