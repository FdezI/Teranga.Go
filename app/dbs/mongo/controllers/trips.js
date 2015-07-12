var mongoose = require('mongoose');

var Trip = require('../models/trip');
var User = require('../models/user');

// AUTHENTICATED
exports.getAll = function(req, res) {
	User.findById(req.params.iduser, function(err, user) {
		Trip.find({_id:{$in:user.trips}}, function(err, trips) {
			if (err) {
				res.send(err);
				return;
			}
			
			res.json(trips);
		});
	});
};

exports.get = function(req, res) {
	Trip.findById(req.params.idtrip).lean().exec(function(err, trip) {
		if (err) {
			res.send(err);
			return;
		}
		
		res.json(trip);
	});
};


// AUTHENTICATED
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
		
		trip.passengers.push(req.params.iduser);
		
		trip.save(function(err) {
			if (err) res.send(err);
			
			res.json({ message: 'Successfully added' });
		});
		
	});
};