var express = require("express");
var boards = require(__dirname+"/app.js");
var app = express();

boards(app, "/", {
	name: "Boards",
	debug: true,
	boards: {
		"b": { name: "Random",
			desc: "Idk, go post things.", },
		"c": { name: "Cute",
			desc: "Nya, nyaaa!", },
	},
	recaptcha: { // https://www.google.com/recaptcha/admin
		site: "",
		secret: ""
	}
});

app.listen("3000", function() {
	console.log("Server is up at *:3000");
});