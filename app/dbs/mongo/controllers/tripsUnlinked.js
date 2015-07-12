var mongoose = require('mongoose');

var Trip = require('../models/trip');
var Car = require('../models/car');
var User = require('../models/user');
var Route = require('../models/route');
var Packet = require('../models/packet');
var PacketRequest = require('../models/packetRequest');
var TravelRequest = require('../models/travelRequest');

// AUTHENTICATED
exports.create = function(req, res) {
	var trip = new Trip();
	trip.route = req.body.route;
	trip.car = req.body.car;
	
	console.log("BODY CAR: " + req.body.car);
	Car.findOne({_id:req.body.car}, function(err, car) {
		if(err) {
			res.send(err);
			return;
		}
		
		User.findOne({_id: car.owner}, function(err, user) {
			if(err) {
				res.send(err);
				return;
			}
			
			trip.save(function(err) { 
				if(err) {
					res.send(err);
					return;
				}
				
				if(user.trips) user.trips.push(trip._id);
				else user.trips = [trip._id];
				
				user.save(function(err) {
					if (err) {
						res.send(err);
						Trip.remove({ _id: trip._id }, function(err) {
							throw err;
						});
					}
				});
				
				res.send(trip);
			});
			
		});
	});
	
// 	trip.save(function(err) {
// 		if (err) res.send(err);
// 		 
// 		res.json({ message: 'Trip created!' });
// 	});
};

// UNREGISTERED
exports.getAll = function(req, res) {
	Trip.find(function(err, trips) {
		if (err) {
			res.send(err);
			return;
		}
		  
		res.json(trips);
	});
};

exports.get = function(req, res) {
	Trip.findById(req.params.idtrip).lean().exec(function(err, trip) {
		if (err) {
			res.send(err);
			return;
		}
		
		if(!('noexp' in req.query)) {
			Car.findById(trip.car, function(err, car) {
				if (err) {
					res.send(err);
					return;
				}
				
				trip.car = car;
				
				
				Route.findById(trip.route, function(err, route) {
					if (err) {
						res.send(err);
						return;
					}
					
					trip.route = route;
					
					PacketRequest.find({ trip:trip._id }, function(err, pack_reqs) {
						if (err) {
							res.send(err);
							return;
						}
						
						Packet.find({_id:{$in: pack_reqs}}, function(err, packets) {
							if(err) {
								res.send(err);
								return;
							}
							
							trip.requested_packets = packets;
							
							TravelRequest.find({trip:trip._id}, function(err, trav_reqs) {
								if (err) {
									res.send(err);
									return;
								}
								
								User.find({_id:{$in: trav_reqs}}, function(err, users) {
									if (err) {
										res.send(err);
										return;
									}
									
									trip.requested_travels = users;
								
									res.json(trip);
								});
							});
						});
					});
// 					res.json(trip);
				});
// 				res.json(trip);
			});
		} else {
			PacketRequest.find({ trip:trip._id }, function(err, pack_reqs) {
				if (err) {
					res.send(err);
					return;
				}
				
				trip.requested_packets = pack_reqs;
				
				TravelRequest.find({trip:trip._id}, function(err, trav_reqs) {
					if (err) {
						res.send(err);
						return;
					}
					
					trip.requested_travels = trav_reqs;
					
					res.json(trip);
				});
			});
		}
	});
};


// AUTHENTICATED
exports.update = function(req, res) {
	//TODO can't change if there is already a passenger, or notify them
	Trip.findById(req.params.idtrip, function(err, trip) {
		if (err) {
			res.send(err);
			return;
		}
		      
		trip.route = req.body.route;
		
		trip.save(function(err) {
			if (err) res.send(err);
			  
			res.json({ message: 'Trip updated!' });
		});
	});
};

exports.delete = function(req, res) {
	Trip.remove({ _id: req.params.idtrip }, function(err, trip) {
		if (err) {
			res.send(err);
			return;
		}
		    
		res.json({ message: 'Successfully deleted' });
	});
	
};

exports.addPassenger = function(req, res) {
	Trip.findById(req.params.idtrip, function(err, trip) {
		if (err) {
			res.send(err);
			return;
		}
		
		trip.passengers.push(req.body.idpassenger);
		
		trip.save(function(err) {
			if (err) res.send(err);
			
			res.json({ message: 'Successfully added' });
		});
		
	});
};