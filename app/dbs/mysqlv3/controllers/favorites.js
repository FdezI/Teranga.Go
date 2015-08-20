var pool = require('mysql').pool;

exports.create = function(req, res, next) {
	pool.query('INSERT INTO favorites SET ?', req.body, function(err, result) {
		if(err) return next(err);

		res.json({id:result.insertId});
	});
};

exports.getAll = function(req, res, next) {
	var filters = req.query;
	var keys = Object.keys(filters);
	var where = "";
	if(keys.length > 0)
		keys.forEach(function(key) { where += " AND " + pool.escapeId(key) + "=" + pool.escape(filters[key]); });

	pool.query('SELECT * FROM favorites WHERE 1' + where, function(err, rows, fields) {
		if(err) return next(err);
		
		res.json(rows);
	});
};

exports.get = function(req, res, next) {
	var filters = req.query;
	var keys = Object.keys(filters);
	var where = "";
	if(keys.length > 0)
		keys.forEach(function(key) { where += " AND " + pool.escapeId(key) + "=" + pool.escape(filters[key]); });

	pool.query('SELECT * FROM favorites WHERE user2=?' + where, req.params.iduser, function(err, rows, fields) {
		if(err) return next(err);
		
		res.json(rows[0]);
	});
};

exports.delete = function(req, res, next) {
	var user1 = req.body.user1;
	var user2 = req.body.user2;
	if(!user1 || !user2) return;

	pool.query('DELETE FROM favorites WHERE user1=? AND user2=?', [user1, user2], function(err, result) {
		if(err) return next(err);
		
		res.json({deleted:result.affectedRows});
	});
};