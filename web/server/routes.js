var fs = require("fs");
var express = require("express");
var bodyParser = require('body-parser');
var profiles = require("./profiles.js");
var combiner = require("./combiner.js");

var app = express();
//app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: "50mb"}));

app.use(express.static("client"));

app.get("/profiles/:collectionName", profiles.getAllHandler);
app.put("/profiles/:collectionName", profiles.insertHandler);
app.post("/profiles/:collectionName", profiles.queryHandler);
app.post("/combiner/run", combiner.runCombinerHandler);

app.use(missing);
app.use(broke);

function missing(req, res, next)
{
	res.status(404).json({status: "missing resource"});
}

function broke(err, req, res, next)
{
	console.error(err.stack);
	res.status(500).json({status: "something serverside broke!"});
}

function serverSuccess()
{
	console.log(`Server is listening on port ${cfg.server.port}!`);
}

function startServer(err, data)
{
	if (err)
	{
		console.error(`Cannot read config file. ${err}`);
	}
	var cfg = JSON.parse(data);
	app.listen(cfg.server.port, serverSuccess);
}

fs.readFile("server/config.json", "utf8", startServer);
