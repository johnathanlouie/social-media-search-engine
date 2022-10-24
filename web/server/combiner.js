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
		var cwd = path.normalize(__dirname);
		var jarName = "uniprofile.jar";
		var jarPath = path.join(cwd, jarName);
		console.log(jarPath, col1, col2, col3);
		if (fs.existsSync(jarPath))
		{
			var options = {};
			options.cwd = cwd;
			var child = childProcess.spawn("java", ["-jar", jarName, col1, col2, col3], options);
			function ran(exitCode)
			{
				if (exitCode === 0)
				{
					console.debug("success: combiner zero exit code");
					res.json({status: "success: combiner zero exit code"});
				} else {
					console.log("failure: combiner nonzero exit code");
					res.status(500).json({status: "failure: combiner nonzero exit code"});
				}
			}
			function printStdout(chunk)
			{
				chunk = typeof chunk === "string" ? chunk : chunk.toString();
				console.log(chunk);
			}
			function printStderr(chunk)
			{
				chunk = typeof chunk === "string" ? chunk : chunk.toString();
				console.error(chunk);
			}
			child.on("close", ran);
			child.stdout.on("data", printStdout);
			child.stderr.on("data", printStderr);
		}
		else
		{
			console.error(`failure: missing combiner jar ${jarPath}`);
			res.status(500).json({status: `failure: missing combiner jar ${jarPath}`});
		}
	}
	else
	{
		console.error("failure: wrong number of collections");
		res.status(400).json({status: "failure: wrong number of collections"});
	}
}

module.exports =
{
	runCombinerHandler: runCombinerHandler
};