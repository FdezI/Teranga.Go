var mysql = require('mysql');

// REGISTERED
exports.create = function(req, res) {
	//INSERT INTO `TFG`.`car` (`name`, `model`, `cvv`, `seats`) VALUES ('MiCoche1', 'Audio A3', '230', '4');
	// Body must be: {iduser:ID, name:NAME, model:MODEL, cvv:XXX, seats:X}
	console.log("BODY: ");
	console.log(req.body);
	if(!req.body.iduser && req.params.iduser) req.body.iduser = req.params.iduser;
	
	mysql.pool.query('INSERT INTO car SET ?', req.body, function(err, result) {
		if(err) throw err;
		
		res.json({id:result.insertId});
	});
};

exports.getAll = function(req, res) {
	mysql.pool.query('SELECT * FROM car', function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};

exports.get = function(req, res) {
	mysql.pool.query('SELECT * FROM car WHERE idcar=?', req.params.idcar, function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows[0]);
	});
};


// AUTHENTICATED
exports.update = function(req, res) {
	mysql.pool.query('UPDATE car SET ? WHERE idcar=?', req.body, req.params.idcar, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res) {
	mysql.pool.query('DELETE FROM car WHERE idcar=?', req.params.idcar, function(err, result) {
		if(err) throw err;
		
		res.json({deleted:result.affectedRows});
	});
};