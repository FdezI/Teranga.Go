var mongoose = require('mongoose');
var Car = require('../models/car');

// ADMIN

exports.getAll = function(req, res) {
	Car.find(function(err, cars) {
		if (err) res.send(err);
		  
		res.json(cars);
	});
};

exports.get = function(req, res) {
	Car.findById(req.params.idcar, function(err, car) {
		if (err) res.send(err);
		     
		res.json(car);
	});
};


exports.update = function(req, res) {
	Car.findById(req.params.idcar, function(err, car) {
		if (err) res.send(err);
		      
		car.name = req.body.name;
		
		car.save(function(err) {
			if (err) res.send(err);
			  
			res.json({ message: 'Car updated!' });
		});
	});
};

exports.delete = function(req, res) {
	Car.remove({ _id: req.params.idcar }, function(err, car) {
		if (err) res.send(err);
		    
		res.json({ message: 'Successfully deleted' });
	});
	
};