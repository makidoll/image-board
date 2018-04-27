var boards = Object.keys(global.settings.boards);

for (var i=0; i<boards.length; i++) {
	let name = boards[i];
	let board = global.settings.boards[name];

	global.app.get(global.path+name, function(req, res) {
		res.send(global.render("board", {
			"board_name": "/"+name+"/ "+board.name,
			"board_desc": board.desc
		}));
	});
}