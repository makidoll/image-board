var sqlite3 = require("sqlite3").verbose();
global.database = new sqlite3.Database(global.__dirname+"/database.db");

global.database.serialize(function() {	
	let boards = Object.keys(global.settings.boards);
	for (var i = 0; i < boards.length; i++) {
		let name = boards[i];
		let board = global.settings.boards[name];
		
		global.database.run("CREATE TABLE IF NOT EXISTS '"+name+"' ("+
			"'id' INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,"+
			"'is_op' BIT NOT NULL,"+
			"'has_image' BIT NOT NULL,"+
			"'comment' TEXT NOT NULL,"+
			"'date' DATE NOT NULL"+
		");");

		global.debugLog("Loaded database: "+name);
	}
});

global.database.close();