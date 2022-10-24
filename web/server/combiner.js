var childProcess = require('child_process');
var path = require('path');
var fs = require("fs");
var helpers = require("./helpers.js");

function runCombinerHandler(req, res)
{
	console.log("function runCombinerHandler");
	var data = req.body;
	console.log(JSON.stringify(data));
	data = helpers.ensureArray(data);
	if (data.length === 3)
	{
		var col1 = data[0];
		var col2 = data[1];
		var col3 = data[2];
		var cwd = path.normalize(`${__dirname}`);
		var jarPath = path.join(cwd, "uniprofile-1.0.jar");
		if (fs.existsSync(jarPath))
		{
			var cmd = `java -jar uniprofile-1.0.jar ${col1} ${col2} ${col3}`;
			var options = {};
			options.cwd = cwd;
			console.log(`${cwd}$ ${cmd}`);
			var child = childProcess.spawn("java", ["-jar", "uniprofile-1.0-jar-with-dependencies.jar", col1, col2, col3], options);
			function ran(exitCode)
			{
				if (exitCode === 0)
				{
					console.log("success: combiner zero exit code");
					res.json({status: "success: combiner zero exit code"});
				} else {
					console.log("failure: combiner nonzero exit code");
					res.status(500).json({status: "failure: combiner nonzero exit code"});
				}
			}
			function err(x) {
				console.log("===========start===============");
				console.log(x);
				console.log("===========end===============");
			}
			function message(x) {
				console.log("===========start===============");
				console.log(x);
				console.log("===========end===============");
			}
			child.on("error", err);
			child.on("message", message);
			child.on("close", ran);
		}
		else
		{
			console.log(`failure: missing combiner jar ${jarPath}`);
			res.json({status: `failure: missing combiner jar ${jarPath}`});
		}
	}
	else
	{
		console.log("failure: wrong number of collections");
		res.json({status: "failure: wrong number of collections"});
	}
}

module.exports =
{
	runCombinerHandler: runCombinerHandler
};