var mongoose = require('mongoose');
var Car = require('../models/car');
var User = require('../models/user');

// REGISTERED
exports.create = function(req, res) {
	var car = new Car();
	car.name = req.body.name;
	car.model = req.body.model;
	car.cvv = req.body.cvv;
	car.seats = req.body.seats;
	
	User.findById(req.params.iduser, function(err, owner) {
		if (err) res.send(err);
		
		car.owner = owner._id;
	
		car.save(function(err) {
			if (err) {
				res.send(err);
				return;
			}
			
			if(owner.cars) owner.cars.push(car._id);
			else owner.cars = [car._id];
			
			owner.save(function(err) {
				if (err) {
					res.send(err);
					Car.remove({ _id: car._id }, function(err) {
						throw err;
					});
				}
			});
			
			res.send({id:car._id});
		});
		
		
	});
	
	
	
};

exports.getAll = function(req, res) {
	Car.find({'owner': req.params.iduser}, function(err, cars) {
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


// AUTHENTICATED
exports.update = function(req, res) {
	Car.findById(req.params.idcar, function(err, car) {
		if (err) res.send(err);
		      
		car.name = req.body.name;
		
		car.save(function(err) {
			if (err) res.send(err);
			  
			res.json({updated:true});
		});
	});
};

exports.delete = function(req, res) {
	Car.remove({ _id: req.params.idcar }, function(err, car) {
		if (err) res.send(err);
		    
		res.json({ message: 'Successfully deleted' });
	});
	
};