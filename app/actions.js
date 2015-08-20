var config = require('./config');
var db     = require('./dbs/' + config.db.name + config.db.version + '/mysqlDB');

var useBase = "http(s)://... /api/v" + config.api.version + "/";

var actions = {
	generate: {
		exec: function(req, res) {
			db.actionController.generate(req, res);

			return true;
		},
		use: useBase + "actions/generate[/type][?save]",
		description: "Generate DB test data and optionally, saves it",
		returns: "The generated data"
	}
}

exports.getActions = function(req, res) {
	res.json(actions);
};

exports.exec = function(req, res) {
	var action = actions[req.params.action];
	if(!action) {
		res.json({message:"There is no action with that name"});
		return;
	}

	if(!action.exec(req, res))
		res.json({message:"Action performed"});
	
	
};