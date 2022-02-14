var dao = require("./dao.js");
var helpers = require("./helpers.js");

function getAllHandler(req, res)
{
	function handlerSuccess(data)
	{
		console.log("handler success");
		res.json(data);
	}
	function handlerFail()
	{
		console.log("handler failure");
		res.json({status: `failure: get all from ${collectionName}`});
	}
	console.log("function getAllHandler");
	var collectionName = req.params.collectionName;
	dao.getAll(collectionName).then(handlerSuccess).catch(handlerFail);
}

function insertHandler(req, res)
{
	function handlerSuccess()
	{
		console.log("handler success");
		res.json({status: `success: insert into ${collectionName}`});
	}
	function handlerFail()
	{
		console.log("handler failure");
		res.json({status: `failure: insert into ${collectionName}`});
	}
	console.log("function insertHandler");
	var collectionName = req.params.collectionName;
	var data = req.body;
//    data = chBody(data);
	data = helpers.ensureArray(data);
	dao.insert(collectionName, data).then(handlerSuccess).catch(handlerFail);
}

function queryHandler(req, res)
{
	function handlerSuccess(results)
	{
		console.log("handler success");
		res.json(results);
	}
	function handlerFail()
	{
		console.log("handler failure");
		res.json({status: `failure: query ${collectionName}`});
	}
	console.log("function queryHandler");
	var collectionName = req.params.collectionName;
	var data = req.body;
//    data = chBody(data);
	dao.find(collectionName, data).then(handlerSuccess).catch(handlerFail);
}

module.exports =
{
	getAllHandler: getAllHandler,
	insertHandler: insertHandler,
	queryHandler: queryHandler
};