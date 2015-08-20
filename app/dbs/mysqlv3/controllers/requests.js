var mysql = require('mysql');


// exports.requestPacket = function(req, res, next) {
	// mysql.pool.query('SELECT packages FROM trip WHERE idtrip=?', req.body.idtrip, function(err, rows, fields) {
	// 	if(rows[0].packages) mysql.pool.query('INSERT INTO packageTrips SET ?', req.body, function(err, result) {
	// 		if(err) return next(err);
			
	// 		res.json({id:result.insertId});
	// 	}); else res.json({requested:false});
	// });
	
// };

exports.acceptRequest = function(req, res, next) {
	var trip = req.query.trip;
	var user = req.query.user;
	var where = "trip=" + pool.escape(trip) + " AND user=" + pool.escape(user);
	pool.query('SELECT trip, user, pointA, pointB, cost, travels FROM requests where ' + where,
		function(err, rows, fields) {
			if(err) return next(err);

			var request = rows[0];
			if(!request) {
				res.json({});
				return;
			}

			pool.query('SELECT trip, package, cost FROM packageRequests WHERE ' + where, function(err, rows, fields) {
				if(err) return next(err);

				var packageReqs = rows;

				pool.getConnection(function(err, connection) {
					if(err) {
						connection.release();
			      return next(err);
					}
					connection.beginTransaction(function(err) {
						if(err) {
							connection.release();
				      return next(err);
						}
						connection.query('INSERT INTO userTrips SET ?', request, function(err, result) {
							if (err) {
					      return connection.rollback(function() {
					      	connection.release();
					        return next(err);
					      });
					    }

					    var startDeletion = function(packagesToo) {
					    	connection.query('DELETE FROM requests' + (packagesToo ? ", packageRequests" : "") + ' WHERE' + where, function(err, result) {
									if (err) {
							      return connection.rollback(function() {
							      	connection.release();
							        return next(err);
							      });
							    }

							    connection.commit(function(err) {
						        if (err) {
						          return connection.rollback(function() {
						          	connection.release();
						            return next(err);
						          });
						        }

						        connection.release();

						        res.json({id:0});
						      });

							  });
					    };


					    if(packages && packages.length > 0) {
								var insertPackage = function() {
									connection.query('INSERT INTO packageTrips SET ?, pointA=?, pointB=?' + [packageReqs.pop(), request.pointA, request.pointB], function(err, result) {
										if (err) {
								      return connection.rollback(function() {
								      	connection.release();
								        return next(err);
								      });
								    }

										if(packages.length > 0) {
											insertPackage();
											return;
										}

										startDeletion(true);

									});

								};

								insertPackage();
							} else startDeletion(false);

					    
						});
					});
				});
			});

			

	});
};

exports.requestTravel = function(req, res, next) {

	var pointA = req.body.pointA;
	var trip = pool.escape(req.body.trip);
	var user = pool.escape(req.body.user);
	var packages = req.body.packages; if(packages) delete req.body.packages;

	// pool.query('SELECT seats FROM trip WHERE tripid = ' + idtrip);

	pool.query('SELECT TP.order, address, stop = 1 AS stop, cost, pkcost, date, seats\
													SUM(CASE WHEN pointA = TP.order THEN 1 ELSE 0 END) as up,\
													SUM(CASE WHEN pointB = TP.order THEN 1 ELSE 0 END) as down\
								FROM tripPoints AS TP\
									JOIN trip ON idtrip = TP.trip\
									LEFT JOIN (\
												SELECT trip\
													,pointA, pointB\
												FROM userTrips AS ut\
												) AS C ON C.trip = TP.trip AND (C.pointA = TP.order OR C.pointB = TP.order\
									)\
								WHERE TP.trip = ' + trip + '\
								GROUP BY TP.order\
								ORDER BY TP.order ASC;', function(err, rows, fields) {
		if(err) return next(err);

		var free = 0;
		var length = rows.length;

		do {
			var loc = rows[i];
			free += loc.down - loc.up;
		} while(loc.order != pointA && i < length);

		if(free <= 0) {
			if(free < 0) throw "It's imposible to have negative free seats";
			return;
		}

		pool.getConnection(function(err, connection) {
			if(err) {
				connection.release();
	      return next(err);
			}
			connection.beginTransaction(function(err) {
				if(err) {
					connection.release();
		      return next(err);
				}
				connection.query('INSERT INTO requests SET ?', req.body, function(err, result) {
					if (err) {
			      return connection.rollback(function() {
			      	connection.release();
			        return next(err);
			      });
			    }

					if(packages && packages.length > 0) {
						var insertPackage = function() {
							connection.query('INSERT INTO packageRequest SET ?, user=' + user + ', trip=' + trip, packages.pop(), function(err, result) {
								if (err) {
						      return connection.rollback(function() {
						      	connection.release();
						        return next(err);
						      });
						    }

								if(packages.length > 0) {
									insertPackage();
									return;
								}

								connection.commit(function(err) {
					        if (err) {
					          return connection.rollback(function() {
					          	connection.release();
					            return next(err);
					          });
					        }

					        connection.release();

					        res.json({id:result.insertId});
					      });

							});

						};

						insertPackage();
					} else {
						connection.release();

						res.json({id:result.insertId});
					}
				});


			});
		});

	});
	// var tripId = pool.escape(req.body.idtrip);
	// var sql = '\
	// SELECT null as used, seats FROM userTrips, car, trip WHERE userTrips.idtrip=' + tripId +' AND userTrips.idtrip=trip.idtrip AND trip.idcar=car.idcar AND accepted=true\
	// UNION\
	// SELECT COUNT(*), null FROM userTrips WHERE idtrip=' + tripId + ' AND accepted=true';
		
	// mysql.pool.query(sql, function(err, rows, fields) {
	// 	if(err) return next(err);
		
	// 	var used = rows[0].used;
	// 	var total = rows[0].seats;
	// 	if(used < total) mysql.pool.query('INSERT INTO userTrips SET ?', req.body, function(err, rows, fields) {
	// 		if(err) return next(err);
			
	// 		res.json({id:result.insertId});
	// 	}); else res.json({requested:false});
		
	// });
};

exports.getAllTravel = function(req, res, next) {
	// mysql.pool.query('SELECT * FROM userTrips WHERE accepted=false', function(err, rows, fields) {
	// 	if(err) return next(err);
		
	// 	res.json(rows);
	// });
};

exports.getAllPacket = function(req, res, next) {
	// mysql.pool.query('SELECT * FROM packageTrips WHERE accepted=false', function(err, rows, fields) {
	// 	if(err) return next(err);
		
	// 	res.json(rows);
	// });
};