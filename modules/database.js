var Datastore = require("nedb");
var fs = require("fs");

let dir = global.__dirname+"/database";
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

global.database = {};

let boards = Object.keys(global.settings.boards);
for (var i = 0; i < boards.length; i++) {
	let name = boards[i];
	let board = global.settings.boards[name];

	global.database[name] = new Datastore(global.__dirname+"/database/"+name+".db")
	global.database[name].loadDatabase();
	global.debugLog("Loaded database: "+name);
}