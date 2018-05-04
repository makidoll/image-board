var boards = Object.keys(global.settings.boards);

for (var i=0; i<boards.length; i++) {
	let name = boards[i];
	let board = global.settings.boards[name];

	global.app.get(global.path+name+"/:id", function(req, res) {
	
		if (!req.params.id) { res.redirect(global.path+name+"#Thread does not exist"); return; }

		let db = new global.db.sql.Database(global.db.path, global.db.sql.OPEN_READONLY);
		db.serialize(function() {
			db.get(
				"SELECT * FROM '"+name+"'"+
				" WHERE id = "+req.params.id+
				" LIMIT 1;"
			,function(err, row) {
				if (err||!row) { res.redirect(global.path+name+"#Thread could not be found"); return; }
			
				res.send(row);
				db.close();
			});
		});

	});
}