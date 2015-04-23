module.exports = {
	development: {
		options: {
			paths: ["src/client/css"]
		},
		files: {
			"build/client/css/styles.css": "src/client/css/styles.less",
			"build/client/css/mobileStyles.css": "src/client/css/mobileStyles.less"
		}
	},
};