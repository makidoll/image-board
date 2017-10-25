module.exports = {
	name: "Image Board", // Name of the website

	web: {
		port: 80 // Port that the site should run from
	},

	// Each board must have its own
	//   "link, "name" and "desc"
	boards: [
		{
			"link": "b",
			"name": "Random",
			"desc": "Upload random stuff that's irrelevant!"
		}
	],

	// Extra things to spice things up
	extra: {
		css: "" // Custom CSS
	}
}