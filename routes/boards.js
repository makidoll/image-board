global.app.get(global.path, function(req, res) {
	let boards_html = "";

	let boards = Object.keys(global.settings.boards);
	for (var i=0; i<boards.length; i++) {
		let board = global.settings.boards[boards[i]];
		boards_html += 
			"<a href='"+global.path+boards[i]+"'><h2>/"+
			boards[i]+"/ "+board.name+
			"</h2><br></a>";
	}

	res.send(global.render("boards", {
		"boards": boards_html
	}));
});