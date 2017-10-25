global = require(__dirname+"/settings");
global.DIRNAME = __dirname;

// Modules
const web = require(__dirname+"/modules/web");

// Start Up
web.start();