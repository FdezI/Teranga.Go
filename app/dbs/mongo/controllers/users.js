var mongoose = require('mongoose');
var User = require('../models/user');
var Car = require('../models/car');
var Trip = require('../models/trip');
var Route = require('../models/route');

// UNREGISTERED
exports.create = function(req, res) {
	var user = new User();
	user.nick = req.body.nick;
	user.email = req.body.email;
	user.password = req.body.password;
	user.cars = [];
	user.trips = [];
	
	
	user.save(function(err) {
		if (err) res.send(err);
		  
		res.json({ message: 'User created!' });
	});
};

exports.getAll = function(req, res) {
	User.find(function(err, users) {
		if (err) res.send(err);
		  
		res.json(users);
	});
// 	if('exp' in req.query)
};

exports.get = function(req, res) {
	//TODO REMOVE sensible data before sending
	User.findById(req.params.iduser).lean().exec(function(err, user) {
		if (err) {
			res.send(err);
			return;
		}
// 		console.log("0");
		if(!('noexp' in req.query)) {
// 			console.log("1");
			Car.find({owner: user._id}).lean().exec(function(err, cars) {
				if (err) {
					res.send(err);
					return;
				}
				
				for(car in cars) delete cars[car].owner;
				
				user.cars = cars;
				Trip.find({_id:{$in: user.trips}}, function(err, trips) {
					if (err) {
						res.send(err);
						return;
					}
					  
					user.trips = trips;
					
// 					for(trip in trips) Route.findById(trips[trip].route, function(err, route) {
// 						if (err) {
// 							res.send(err);
// 							return;
// 						}
// 						
// 						trips[trip].route = route;
// 						
// 						res.json(user);
// 					});
					res.json(user);
				});
			});
		} else res.json(user);
	});
};


// AUTHENTICATED
exports.update = function(req, res) {
	User.findById(req.params.iduser, function(err, user) {
		if(err) res.send(err);
		      
		console.log(req.body.hasOwnProperty('packets'));
		      
		var updated = false;
		if(req.body.hasOwnProperty('nick')) {
			user.nick = req.body.nick;
			updated = true;
		}
		if(req.body.hasOwnProperty('email')) {
			user.email = req.body.email;
			updated = true;
		}
		if(req.body.hasOwnProperty('packets')) {
			user.packets = req.body.packets;
			updated = true;
			console.log("ToUpdate");
		}
		      
		if(updated) user.save(function(err) {
			if (err) res.send(err);
			
			console.log("UPDATED, packets: " + user.packets);
			res.send(true);
		});
		else res.send(updated);
	});
};

exports.delete = function(req, res) {
	User.remove({ _id: req.params.iduser }, function(err, user) {
		if (err) res.send(err);
		    
		res.send(true);
	});
	
};