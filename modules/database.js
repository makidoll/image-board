global.db = {
	sql: require("sqlite3").verbose(),
	path: global.__dirname+"/database.db"
};

// let db = new global.db.sql.Database(global.db.path, global.db.sql.OPEN_READONLY);
// db.serialize(function() { });
// db.close();

let db = new global.db.sql.Database(global.db.path); // adds the create mode
db.serialize(function(){
	let boards = Object.keys(global.settings.boards);
	for (var i = 0; i < boards.length; i++) {
		let name = boards[i];
		let board = global.settings.boards[name];
		
		db.run("CREATE TABLE IF NOT EXISTS '"+name+"' ("+
			"'id' INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE,"+
			"'op_id' INTEGER NOT NULL,"+
			"'image_ext' TEXT,"+
			"'comment' TEXT NOT NULL,"+
			"'date' DATETIME NOT NULL"+
		");");

		global.debugLog("Loaded database: "+name);
	}
});
db.close();