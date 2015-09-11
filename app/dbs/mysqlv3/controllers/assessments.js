var pool = require('mysql').pool;

exports.create = function(req, res, next) {
	var user = req.session.iduser;
	var body = req.body;
	body.user = user;
	
	pool.query('INSERT INTO assessment SET ?', body, function(err, result) {
		if(err) return next(err);

		res.json({id:result.insertId});
	});
};