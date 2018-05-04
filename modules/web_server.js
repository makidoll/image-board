var express = require("express");
var multer = require("multer");
global.multer = multer();

var routes = [
	"boards", // landing page
	"board",  // /(?)/, each page
	"thread",   // /(?)/, each thread, add page 

	"api/new-thread" // /???/, each page
];

global.app.use(global.path, express.static(global.__dirname+"/public"));
global.app.use

for (var i=0; i<routes.length; i++) {
	if (require(global.__dirname+"/routes/"+routes[i])) {
		global.debugLog("Loaded route: "+routes[i]);
	}
}