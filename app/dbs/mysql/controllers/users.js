var mysql = require('mysql');

// UNREGISTERED
exports.create = function(req, res) {
	console.log("-----------------------------------------");
	console.log(req.body);
	mysql.pool.query('INSERT INTO user SET ?', req.body, function(err, result) {
		if(err) throw err;
		
		res.json({id:result.insertId});
	});
};

exports.getAll = function(req, res) {
	mysql.pool.query('SELECT nick FROM user', function(err, rows, fields) {
		if(err) {
			throw err;
			//TODO handle errors on server.js
// 			res.json({error:true});
// 			return;
		}
		
		res.json(rows);
	});
// 	if('exp' in req.query)
};

exports.get = function(req, res) {
	//TODO JOIN THE 3 SELECT IN ONLY ONE using JOINS
	mysql.pool.query('SELECT * FROM user WHERE user.iduser=?', req.params.iduser, function(err, rows, fields) {
		if(err) throw err;
		console.log("ROWS: " + rows);
		
		var user = rows[0];
		delete rows[0].password;

		mysql.pool.query('SELECT * FROM car WHERE iduser=?', req.params.iduser, function(err, rows, fields) {
			user.cars = rows;
			
			if(rows.length > 0) {
				var cars = Array(rows.length);
				for(car in rows) cars.push(car.idcar)
				
				mysql.pool.query('SELECT * FROM trip WHERE idcar IN (?)', cars, function(err, rows, fields) {
					user.trips = rows;
					res.json(user);
				});
			} else res.json(user);
		});
		
		//res.json(rows[0]);
	});
};


// AUTHENTICATED
exports.update = function(req, res) {
	mysql.pool.query('UPDATE user SET ? WHERE iduser=?', req.body, req.params.iduser, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res) {
	mysql.pool.query('DELETE FROM user WHERE iduser=?', req.params.iduser, function(err, result) {
		if(err) throw err;
		
		res.json({deleted:result.affectedRows});
	});
};