var mongoose = require('mongoose');
var Bear = require('../models/bear');

exports.create = function(req, res) {
	var bear = new Bear();      // create a new instance of the Bear model
	bear.name = req.body.name;  // set the bears name (comes from the request)
	
	// save the bear and check for errors
	bear.save(function(err) {
		if (err) res.send(err);
		  
		res.json({ message: 'Bear created!' });
	});
};

// get all the bears (accessed at GET http://localhost:8080/api/bears)
exports.getAll = function(req, res) {
	Bear.find(function(err, bears) {
		if (err) res.send(err);
		  
		res.json(bears);
	});
};

// get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
exports.get = function(req, res) {
	Bear.findById(req.params.bear_id, function(err, bear) {
		if (err) res.send(err);
		res.json(bear);
	});
};

// update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
exports.update = function(req, res) {
	// use our bear model to find the bear we want
	Bear.findById(req.params.bear_id, function(err, bear) {
		if (err) res.send(err);
		      
		bear.name = req.body.name;  // update the bears info
		
		// save the bear
		bear.save(function(err) {
			if (err) res.send(err);
			  
			res.json({ message: 'Bear updated!' });
		});
	});
};

// delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
exports.delete = function(req, res) {
	Bear.remove({ _id: req.params.bear_id }, function(err, bear) {
		if (err) res.send(err);
		    
		res.json({ message: 'Successfully deleted' });
	});
	
};