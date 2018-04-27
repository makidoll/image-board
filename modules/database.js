var Datastore = require("nedb");

global.database = {};
function loadBoard(name) {
	global.database[name] = new Datastore(global.__dirname+"/database/"+name+".db")
	global.database[name].loadDatabase();

	global.debugLog("Loading database: "+name);
}

let boards = Object.keys(global.settings.boards);
for (var i = 0; i < boards.length; i++) {
	let name = boards[i];
	let board = global.settings.boards[name];
	loadBoard(name);
}