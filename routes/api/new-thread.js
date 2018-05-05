var boards = Object.keys(global.settings.boards);
var moment = require("moment");
var fs = require("fs");
var request = require("request");

for (var i=0; i<boards.length; i++) {
	let name = boards[i];
	let board = global.settings.boards[name];

	global.app.post(global.path+name+"/new-thread",
		global.multer.single("image"), function(req, res) {

		if (!req.file)
			{ res.redirect(global.path+name+"#There was no image attached"); return; }

		let fileExt = global.getExt(req.file.originalname);
		if (fileExt != "jpg" &&
		    fileExt != "jpeg" &&
		    fileExt != "png" &&
		    fileExt != "gif")
			{ res.redirect(global.path+name+"#Image isn't a JPG, PNG or GIF"); return; }

		if (req.file.size/1024/1024 > 5)
			{ res.redirect(global.path+name+"#Image exceeds 5 MB"); return; }

		if (!req.body.comment)
			{ res.redirect(global.path+name+"#There was no comment attached"); return; }

		if (req.body.comment.length > 1200)
			{ res.redirect(global.path+name+"#Comment exceeded 1200 characters"); return; }

		if (!req.body["g-recaptcha-response"]) 
			{ res.redirect(global.path+name+"#Captcha wasn't solved"); return; }

		// check captcha
		request.post("https://www.google.com/recaptcha/api/siteverify"+
			"?secret="+global.settings.recaptcha.secret+
			"&response="+req.body["g-recaptcha-response"]
		,function(err, c_res, body) {
			if (!JSON.parse(body)["success"] || err)
				{ res.redirect(global.path+name+"#Captcha says you're not human");
				  if (err) global.debugLog("Captcha failed: "+err); return; }

			let comment = req.body.comment.trim();
			let fileExt = global.getExt(req.file.originalname);

			let db = new global.db.sql.Database(global.db.path, global.db.sql.OPEN_READWRITE);
			db.serialize(function() {
				db.get("SELECT COUNT(id) AS id FROM '"+name+"'", function(err, id) {
					id = id.id+1;

					// write file
					fs.writeFile(global.__dirname+"/public/"+name+"/"+id+"."+fileExt, req.file.buffer, function(err) {

						if (err) {
							debugLog("Error uploading file: "+err);
							res.redirect(global.path+name+"#There was an error whilst uploading your file")
							db.close();
							return;
						}

						// add post to database
						db.run("INSERT INTO '"+name+"' (op_id, image_ext, comment, date) "+
						"VALUES (0,(?),(?),"+
							"'"+moment().format("YYYY-MM-DD HH:mm:ss")+"'"+
						");", fileExt, comment, function(err) {
							if (err) {
								res.redirect(global.path+name+"#Failed to add your thread");
								global.debugLog("Failed to add thread on "+name+", id: "+id+"\n"+comment+"\n"+err);
								db.close();
								return; 
							}

							global.debugLog("New thread on "+name+", id: "+id+"\n"+comment);
							res.redirect(global.path+name+"/"+id);
							db.close();		
						});

					}); // fs.readFile

				}); // db.get
			}); // db.serialize
		}); // request(captcha)
	}); // global.app.post
}