var mysql = require('mysql');

// UNREGISTERED
exports.auth = function(req, res, next) {
	if(req.query.logout || req.query.hasOwnProperty('logout')) {
		req.session.destroy(function(err) { if(err) return next(err); })
	} else {
		if(!req.body.email || !req.body.password) res.json({});
		
		mysql.pool.query('SELECT iduser, name, surnames, email, phone, carnet = 1 as carnet, avatar, birth, karma, karma IS NOT NULL AS driver\
											FROM `user` WHERE `email`=? AND `password`=UNHEX(SHA2(?, 256))', [req.body.email, req.body.password], function(err, rows, fields) {
			if(err) return next(err);
			
			var user = rows[0];
			if(user.iduser) req.session.iduser = user.iduser;

			res.json(user);
		});
	}
};