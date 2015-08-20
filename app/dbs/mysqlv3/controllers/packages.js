var mysql = require('mysql');

// REGISTERED
exports.create = function(req, res, next) {
	mysql.pool.query('INSERT INTO package SET ?', req.body, function(err, result) {
		if(err) return next(err);
		
		res.json({idpackage:result.insertId});
	});
};

exports.getAll = function(req, res, next) {
	mysql.pool.query('SELECT * FROM package', function(err, rows, fields) {
		if(err) return next(err);
		
		res.json(rows);
	});
};

exports.get = function(req, res, next) {
	mysql.pool.query('SELECT * FROM package WHERE idpackage=?', req.params.idpackage, function(err, rows, fields) {
		if(err) return next(err);
		
		res.json(rows[0]);
	});
};


// AUTHENTICATED
exports.update = function(req, res, next) {
	// TODO Can't change if already on ship
	mysql.pool.query('UPDATE package SET ? WHERE idpackage=?', req.body, req.params.idpackage, function(err, result) {
		if(err) return next(err);
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res, next) {
	mysql.pool.query('DELETE FROM package WHERE idpackage=?', req.params.idpackage, function(err, result) {
		if(err) return next(err);
		
		res.json({deleted:result.affectedRows});
	});
};