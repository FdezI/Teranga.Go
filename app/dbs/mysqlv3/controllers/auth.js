var mysql = require('mysql');

// UNREGISTERED
exports.auth = function(req, res) {
	var response = {};
	if(!req.body.email || !req.body.password) res.json(response);
	
	if(Object.keys(req.query).length == 0)
		var identifiers = 'iduser, name, surnames, email, phone, carnet = 1 as carnet, avatar, birth, karma';
	else identifiers = pool.escapeId(req.query);
	
	mysql.pool.query('SELECT iduser, name, surnames, email, phone, carnet = 1 as carnet, avatar, birth, karma, karma IS NOT NULL AS driver\
										FROM `user` WHERE `email`=? AND `password`=UNHEX(SHA2(?, 256))', [req.body.email, req.body.password], function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows[0]);
	});
};