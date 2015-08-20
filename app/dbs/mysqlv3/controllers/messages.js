var pool = require('mysql').pool;

exports.getAll = function(req, res, next) {
	var since = req.query.since;

	pool.query('SELECT idmessage, emitter, receiver, subject, content, date, Mread = 1 as "read" FROM message M' + (since ? " WHERE date>=" + pool.escape(since) : ""), function(err, rows, fields) {
		if(err) return next(err);
		
		res.json(rows);
	});
};

exports.markRead = function(req, res, next) {
	var body = req.body;

	pool.query('UPDATE message N SET N.read=1 WHERE receiver=? AND idmessage IN (?)',
						[body.receiver, body.messages], function(err, result) {
		if(err) return next(err);

		res.json({changed:result.changedRows});
	});
}