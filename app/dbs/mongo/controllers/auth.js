var mongoose = require('mongoose');
var User = require('../models/user');

// UNREGISTERED
exports.auth = function(req, res) {
	var response = {};
	console.log("EMAIL: " + req.body.email);
	console.log("BODY: " + req.body[0]);
	console.log("PARAMS:EMAIL: " + req.params.email);
	if(!req.body.email || !req.body.password) res.json(response);
	else User.findByEmail(req.body.email, function(err, user) {
		if (err) res.send(err);
		
		var valid = false;
// 		if(user.length > 0) {
		valid = user.checkPassword(req.body.password);
		if(valid) {
			req.session.loged = valid;
			response = {'id':user._id, 'nick':user.nick};
		}
// 		}
		
		console.log("Autenticado, respuesta: " + response['id']);
		res.json(response);
	});
};