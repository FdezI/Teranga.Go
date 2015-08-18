var pool = require('mysql').pool;
var config = require('../../../config');

exports.get = function(req, res, next) {
	var keys = Object.keys(req.params);
	var qKeys = Object.keys(req.query);
	var length = keys.length;
	var qLength = qKeys.length;

	if(length > 0) {
		var send = {};
		if(length > 1) {
			if(qLength > 0) {
				keys.forEach(function(key) {
					var subSend = send[req.params[key]] = {};
					var subConfig = config[req.params[key]];
					qKeys.forEach(function(qKey) {
						subSend[qKey] = subConfig[qKey];
					});
				});
			} else keys.forEach(function(key) {
								send[req.params[key]] = config[req.params[key]][config[key]];
							});
		} else {
			var subConfig = config[req.params[keys[0]]];
			if(qLength > 0)
				qKeys.forEach(function(qKey) {
					send[qKey] = subConfig[qKey];
				});
			else send = subConfig;
		}
	} else send = config;

	res.json(send);
}