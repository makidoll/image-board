const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", function(req, res) {
	res.send(
		fs.readFileSync(global.DIRNAME+"/web/index.html", "utf8")
	);
});

app.get("/style.css", function(req, res) {
	res.header("Content-Type", "text/css");
	res.send(
		(fs.readFileSync(global.DIRNAME+"/web/style.css", "utf8")+global.extra.css)
		.replace(/\t|\n/g, "")
	);
});

module.exports = {
	start: function() {
		app.listen(global.web.port)
		console.log(global.name+" is up on *:"+global.web.port)
	}
}