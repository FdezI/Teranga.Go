var pool = require('mysql').pool;

// REGISTERED
exports.create = function(req, res) {
	//INSERT INTO `TFG`.`car` (`name`, `model`, `cvv`, `seats`) VALUES ('MiCoche1', 'Audio A3', '230', '4');
	// Body must be: {iduser:ID, name:NAME, model:MODEL, cvv:XXX, seats:X}
	console.log("BODY: ");
	console.log(req.body);
	var user = req.body.iduser;

	if(!user) user = req.params.iduser;
	else delete req.body.iduser;

	if(!user) return;

	// if(!req.body.iduser && req.params.iduser) req.body.iduser = req.params.iduser;
	
	pool.getConnection(function(err, connection) {
		connection.beginTransaction(function(err) {
			connection.query('INSERT INTO car SET ?', req.body, function(err, result) {
				if (err) {
		      return connection.rollback(function() {
		      	connection.release();
		        throw err;
		      });
		    }

		    connection.query('INSERT INTO owners SET `car`=?, `owner`=?', [req.body.idcar, user], function(err, result) {
					if (err) {
			      return connection.rollback(function() {
			      	connection.release();
			        throw err;
			      });
			    }

		 			connection.commit(function(err) {
		        if (err) {
		          return connection.rollback(function() {
		          	connection.release();
		            throw err;
		          });
		        }

		        console.log('success!');
		      });

					
		 			
		 			connection.query('SELECT COUNT(car) AS owners FROM owners WHERE car=?', req.body.idcar, function(err, rows, fields) {
		 				if(err) {
		 					connection.release();
		 					throw err;
		 				}
		 				
		 				res.json(rows[0]);
		 				
		 				connection.release();
		 			});
		    });
			});
		});
	});
	
	// pool.query('START TRANSACTION;\
	// 										INSERT INTO car SET ?;\
	// 										INSERT INTO owners SET `car`=?, `owner`=?;\
	// 									COMMIT;', [req.body, req.body.idcar, user], function(err, result) {
	// 	if(err) throw err;
		
	// 	res.json({id:result.insertId});
	// });
};

exports.getAll = function(req, res) {
	pool.query('SELECT * FROM car', function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows);
	});
};

exports.get = function(req, res) {
	pool.query('SELECT * FROM car WHERE idcar=?', req.params.idcar, function(err, rows, fields) {
		if(err) throw err;
		
		res.json(rows[0]);
	});
};


// AUTHENTICATED
exports.update = function(req, res) {
	pool.query('UPDATE car SET ? WHERE idcar=?', req.body, req.params.idcar, function(err, result) {
		if(err) throw err;
		
		res.json({changed:result.changedRows});
	});
};

exports.delete = function(req, res) {
	pool.query('DELETE FROM car WHERE idcar=?', req.params.idcar, function(err, result) {
		if(err) throw err;
		
		res.json({deleted:result.affectedRows});
	});
};