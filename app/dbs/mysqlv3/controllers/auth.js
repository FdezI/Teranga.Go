var mysql = require('mysql');

// UNREGISTERED
exports.auth = function(req, res) {
	var response = {};
	if(!req.body.email || !req.body.password) res.json(response);
	
	// TO avoid injection, use pool.escape() (?) or pool.escapeId() (??)
	mysql.pool.query('SELECT iduser, name FROM `user` WHERE `email`=? AND `password`=UNHEX(SHA2(?, 256))', [req.body.email, req.body.password], function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows[0]);
	});
};