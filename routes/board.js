var boards = Object.keys(global.settings.boards);
var fs = require("fs");
var moment = require("moment");

for (var i=0; i<boards.length; i++) {
	let name = boards[i];
	let board = global.settings.boards[name];

	let publicDir = global.__dirname+"/public/"+name;
	if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);

	global.app.get(global.path+name, function(req, res) {

		let db = new global.db.sql.Database(global.db.path, global.db.sql.OPEN_READONLY);
		db.serialize(function() {
			let threads = "";
			
			db.each("SELECT * FROM '"+name+"' WHERE op_id = 0 "+
				"ORDER BY date DESC LIMIT 1000;", function(err, row) {

				threads += '<div id="thread">'+
					'<a href="'+global.path+name+"/"+row.id+'">'+
						'<div id="thumbnail" style="background-image: url('+
						global.path+name+"/"+row.id+"."+row.image_ext+');"></div>'+
					'</a>'+
					'<p id="extra">'+
					"<b>id: "+row.id+"</b>, "+moment(row.date, "YYYY-MM-DD HH:mm:ss").format("HH:mm, DD/MM/YY")+
					'</p>'+
					'<p>'+row.comment+'</p>'+
				'</div>';
			}, function() {
				res.send(global.render("board", {
					"board_name": "/"+name+"/ "+board.name,
					"board_desc": board.desc,
					"thread_url": global.path+name+"/new-thread",
					"recaptcha_key": global.settings.recaptcha.site,
					"threads": threads,
				}));
				db.close();
			}); // db.each
		}); // db.serialize

	});
}
