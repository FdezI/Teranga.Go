var mysql = require('mysql');

// REGISTERED
exports.create = function(req, res) {
	req.body.iduser = req.params.iduser;
	mysql.pool.query('INSERT INTO package SET ?', req.body, function(err, result) {
		if(err) throw err;
		
		res.json({id:result.insertId});
	});
};

exports.getAll = function(req, res) {
	mysql.pool.query('SELECT * FROM package', function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};

exports.get = function(req, res) {
	mysql.pool.query('SELECT * FROM package WHERE idpackage=?', req.params.idpackage, function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows[0]);
	});
};


// AUTHENTICATED
exports.update = function(req, res) {
	// TODO Can't change if already on ship
	mysql.pool.query('UPDATE package SET ? WHERE idpackage=?', req.body, req.params.idpackage, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res) {
	mysql.pool.query('DELETE FROM package WHERE idpackage=?', req.params.idpackage, function(err, result) {
		if(err) throw err;
		
		res.json({deleted:result.affectedRows});
	});
};