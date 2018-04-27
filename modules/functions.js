var fs = require("fs");

global.debugLog = function(msg) {
	if (global.settings.debug) console.log("[DEBUG] "+msg);
}

global.render = function(view, replaces) {
	let style = fs.readFileSync(global.__dirname+"/views/style.css", "utf8")
	style = style.replace(/\[path\]/gi, global.path);

	let html = fs.readFileSync(global.__dirname+"/views/index.html", "utf8")
	html = html.replace(/\[view\]/gi, fs.readFileSync(global.__dirname+"/views/"+view+".html", "utf8"));
	html = html.replace(/\[title\]/gi, global.settings.name);
	html = html.replace(/\[path\]/gi, global.path);
	html = html.replace(/\[header\]/gi, (function(){
		let out = "<p>";
		let boards = Object.keys(global.settings.boards);
		for (var i=0; i<boards.length; i++) {
			out += "<a href='"+global.path+boards[i]+
			"'>"+boards[i]+"</a>";

			if (!(i+1>=boards.length)) out += ", ";
		}
		return out+"</p>";
	})());

	if (replaces) {
		let replace_keys = Object.keys(replaces);
		for (var i=0; i<replace_keys.length; i++) {
			let key = replace_keys[i];
			let value = replaces[key];
			html = html.replace(new RegExp("\\["+key+"\\]", "gi"), value);
		}
	}

	html = html.replace(/\[style\]/gi, style);
	global.debugLog("Rendered: "+view);
	return html;
}