var mongoose = require('mongoose');
var Packet = require('../models/packet');
var User = require('../models/user');
var Trip = require('../models/trip');

// REGISTERED
exports.create = function(req, res) {
	var packet = new Packet();
	packet.name = req.body.name;
	packet.value = req.body.value;
	
	var owner = User.findById(req.params.iduser, function(err) {
		if (err) res.send(err);
	});
	
	packet.owner = req.params.iduser;
	
	packet.save(function(err) {
		if (err) res.send(err);
		 
		res.json({ message: 'Packet created!' });
	});
};

exports.getAll = function(req, res) {
	Packet.find(function(err, packets) {
		if (err) res.send(err);
		  
		res.json(packets);
	});
};

exports.get = function(req, res) {
	Packet.findById(req.params.idpackage, function(err, packet) {
		if (err) res.send(err);
		     
		res.json(packet);
	});
};


// AUTHENTICATED
exports.update = function(req, res) {
	// TODO Can't change if already on ship
	Packet.findById(req.params.idpackage, function(err, packet) {
		if (err) res.send(err);
		      
		packet.name = req.body.name;
		packet.value = req.body.value;
		
		packet.save(function(err) {
			if (err) res.send(err);
			  
			res.json({ message: 'Packet updated!' });
		});
	});
};

exports.delete = function(req, res) {
	Packet.remove({ _id: req.params.idpackage }, function(err, packet) {
		if (err) res.send(err);
		    
		res.json({ message: 'Successfully deleted' });
	});
};