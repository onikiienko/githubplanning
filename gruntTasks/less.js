'use strict';

module.exports = {
	development: {
		options: {
			paths: ["src/client/css"]
		},
		files: {
			"build/client/css/styles.css": "src/client/css/styles.less"
		}
	},
}