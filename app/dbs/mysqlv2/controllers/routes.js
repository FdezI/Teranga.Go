var pool = require('mysql').pool;

// ADMIN
exports.create = function(req, res) {
	
};

// UNREGISTERED
exports.getAll = function(req, res) {
	if(req.query.list || req.query.hasOwnProperty('list')) var select = "idroute, name";
	else select = "*";

	pool.query('SELECT ' + select + ' FROM route', function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};

exports.get = function(req, res) {
	pool.query('SELECT * FROM route WHERE idroute=?', req.params.idroute, function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows[0]);
	});
};


// ADMIN
exports.update = function(req, res) {
	pool.query('UPDATE user SET ? WHERE iduser=?', req.body, req.params.idroute, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res) {
	pool.query('DELETE FROM route WHERE idroute=?', req.params.idroute, function(err, result) {
		if(err) throw err;
		
		res.json({deleted:result.affectedRows});
	});
};

exports.addWaypoint = function(req, res) {
	pool.query('INSERT INTO waypoints SET ?', {tripid:req.params.idtrip, userid:req.params.iduser, type:req.body.type}, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};