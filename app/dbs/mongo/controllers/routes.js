var mongoose = require('mongoose');

var Route = require('../models/route');

// ADMIN
exports.create = function(req, res) {
	var route = new Route();
	route.origin = req.body.origin;
	route.destination = req.body.destination;
	if(req.body.waypoints) route.waypoins = req.body.waypoints;
	route.car = req.body.car;
	
	route.save(function(err) {
		if (err) res.send(err);
		 
		res.json({ message: 'Route created!' });
	});
};

// UNREGISTERED
exports.getAll = function(req, res) {
	Route.find(function(err, routes) {
		if (err) res.send(err);
		  
		res.json(routes);
	});
};

exports.get = function(req, res) {
	Route.findById(req.params.idroute, function(err, route) {
		if (err) res.send(err);
		     
		res.json(route);
	});
};


// ADMIN
exports.update = function(req, res) {
	//TODO can't change if there is already a passenger, or notify them
	Route.findById(req.params.idroute, function(err, route) {
		if (err) res.send(err);
		      
		route.origin = req.body.origin;
		route.destination = req.body.destination;
		if(req.body.waypoints) route.waypoints = req.body.waypoints;
		
		route.save(function(err) {
			if (err) res.send(err);
			  
			res.json({ message: 'Route updated!' });
		});
	});
};

exports.delete = function(req, res) {
	Route.remove({ _id: req.params.idroute }, function(err, route) {
		if (err) res.send(err);
		    
		res.json({ message: 'Successfully deleted' });
	});
	
};

exports.addWaypoint = function(req, res) {
	Route.findById(req.params.idroute, function(err, route) {
		if (err) res.send(err);
		
		route.waypoints.push(req.body.waypoint);
		
		route.save(function(err) {
			if (err) res.send(err);
			
			res.json({ message: 'Successfully added' });
		});
		
	});
};