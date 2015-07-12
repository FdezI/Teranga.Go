var mongoose = require('mongoose');

var TravelReq = require('../models/travelRequest');
var PacketReq = require('../models/packetRequest');
var Car = require('../models/car');
var Trip = require('../models/trip');


// AUTHENTICATED
exports.requestPacket = function(req, res) {
	if(!req.body.idtrip || !req.body.idpackage) {
		res.send(false);
		return;
	}
	
	Trip.findById(req.body.idtrip, function(err, trip) {
		if(err) {
			res.send(err);
			return;
		} else if(!trip.accept_packets) {
			res.send(false);
			return;
		}
		
		var packetReq = new PacketReq();
		packetReq.packet = req.body.idpackage;
		packetReq.trip = req.body.idtrip;
		
		packetReq.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}
			
			res.json(true);
		});
	});
};

exports.requestTravel = function(req, res) {
	if(!req.body.idtrip || !req.body.iduser) {
		res.send(false);
		return;
	}
	
	Trip.findById(req.body.idtrip, function(err, trip) {
		if(err) {
			res.send(err);
			return;
		}
		
		console.log("5");
		Car.findById(trip.car, function(error, car) {
			if(err) {
				res.send(err);
				return;
			}
			
			if(car.seats == 0 || (trip.passengers && trip.passengers.length >= car.seats)) {
				res.send(false);
				return;
			}
			
			
			var travelReq = new TravelReq();
			travelReq.user = req.body.iduser;
			travelReq.trip = req.body.idtrip;
			
			travelReq.save(function(err) {
				if(err) {
					res.send(err);
					return;
				}
				
				res.json(true);
			});
		});
	});
};

exports.getAllTravel = function(req, res) {
	TravelReq.find(function(err, reqs) {
		if(err) {
			res.send(err);
			return;
		}
		
		res.json(reqs);
	});
};

exports.getAllPacket = function(req, res) {
	PacketReq.find(function(err, reqs) {
		if(err) {
			res.send(err);
			return;
		}
		
		res.json(reqs);
	});
};