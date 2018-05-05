var express = require("express");
var boards = require(__dirname+"/app.js");
var app = express();

boards(app, "/", {
	name: "Maki Boards",
	debug: true,
	boards: {
		"b": { name: "Random",
			desc: "Idk, go post things.", },
		"irl": { name: "Real Life",
			desc: "The real world still exists.", },
		"tech": { name: "Technology",
			desc: "Computers in our current era.", },
		"lewd": { name: "Lewd",
			desc: "You better not be in public!", },
	},
	recaptcha: { // https://www.google.com/recaptcha/admin 
		site: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI", // testing
		secret: "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe" // testing
	}
});

app.listen("3000", function() {
	console.log("Server is up at *:3000");
});