var pool = require('mysql').pool;

exports.getAll = function(req, res, next) {
	var since = req.query.since;

	pool.query('SELECT idnotification, emitter, receiver, type, date, object, N.read = 1 as "read" FROM notification N' + (since ? " WHERE date>=" + pool.escape(since) : ""), function(err, rows, fields) {
		if(err) return next(err);
		
		res.json(rows);
	});
};

exports.markRead = function(req, res, next) {
	var body = req.body;

	pool.query('UPDATE notification N SET N.read=1 WHERE receiver=? AND idnotification IN (?)',
						[body.receiver, body.notifications], function(err, result) {
		if(err) return next(err);

		res.json({changed:result.changedRows});
	});// else res.json({failed:1});
}