global.__dirname = __dirname;
require(global.__dirname+"/modules/functions");

module.exports = function(app, path, settings) {

	global.app = app;
	global.path = path;

	// add / to the end of path
	if (global.path.slice(-1) != "/")
		global.path += "/";

	// handle user settings
	if (!settings) settings = {};
	global.settings = settings;

	if (!global.settings.name) global.settings.name = "Image Board";
	if (!global.settings.debug) global.settings.debug = false;

	// load main modules
	require(global.__dirname+"/modules/database");
	require(global.__dirname+"/modules/web_server");

}