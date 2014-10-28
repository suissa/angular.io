exports.config = {
	allScriptsTimeout: 11000,
	specs: [
		'e2e-tests/**/*.js'
	],
	capabilities: {
		'browserName': 'chrome'
	},
	seleniumAddress: 'http://localhost:4444/wb/hub'
};