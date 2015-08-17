var pool = require('mysql').pool;

exports.getAll = function(req, res) {
	var since = req.query.since;

	pool.query('SELECT emitter, receiver, type, date, object, N.read = 1 as "read" FROM notification N' + (since ? " WHERE date>=" + pool.escape(since) : ""), function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};