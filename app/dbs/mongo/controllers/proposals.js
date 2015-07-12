var mongoose = require('mongoose');

var Proposal = require('../models/proposal');

// AUTHENTICATED
exports.create = function(req, res) {
	var proposal = new Proposal();
	proposal.origin = req.body.origin;
	proposal.destination = req.body.destination;
	proposal.car = req.body.car;
	
	proposal.save(function(err) {
		if (err) res.send(err);
		 
		res.json({ message: 'Proposal created!' });
	});
};

// UNREGISTERED
exports.getAll = function(req, res) {
	Proposal.find(function(err, proposals) {
		if (err) res.send(err);
		  
		res.json(proposals);
	});
};

exports.get = function(req, res) {
	Proposal.findById(req.params.idproposal, function(err, proposal) {
		if (err) res.send(err);
		     
		res.json(proposal);
	});
};


// AUTHENTICATED
exports.update = function(req, res) {
	//TODO can't change if there is already a passenger, or notify them
	Proposal.findById(req.params.idproposal, function(err, proposal) {
		if (err) res.send(err);
		      
		proposal.origin = req.body.origin;
		proposal.destination = req.body.destination;
		
		proposal.save(function(err) {
			if (err) res.send(err);
			  
			res.json({ message: 'Proposal updated!' });
		});
	});
};

exports.delete = function(req, res) {
	Proposal.remove({ _id: req.params.idproposal }, function(err, proposal) {
		if (err) res.send(err);
		    
		res.json({ message: 'Successfully deleted' });
	});
	
};

exports.addPassenger = function(req, res) {
	Proposal.findById(req.params.idproposal, function(err, proposal) {
		if (err) res.send(err);
		
		proposal.passengers.push(req.body.passenger_id);
		
		proposal.save(function(err) {
			if (err) res.send(err);
			
			res.json({ message: 'Successfully added' });
		});
		
	});
};