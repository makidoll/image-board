var express = require("express");

var routes = [
	"boards", // landing page
	"board", // /???/, each page
];

global.app.use(global.path, express.static(global.__dirname+"/public"));

for (var i=0; i<routes.length; i++) {
	if (require(global.__dirname+"/routes/"+routes[i])) {
		global.debugLog("Loaded route: "+routes[i]);
	}
}