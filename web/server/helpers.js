function ensureArray(data)
{
	console.log("function ensureArray");
	if (!Array.isArray(data))
	{
		console.log(" - data converted to array");
		data = [data];
	}
	else
	{
		console.log(" - data already array");
	}
	return data;
}

module.exports =
{
	ensureArray: ensureArray
};
