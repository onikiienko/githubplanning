'use strict';

module.exports = { 
		beforeconcat: [
			'src/client/js/views/*.js', 
			'src/server/*.js',
			'app.js'
		],
		afterconcat: ['build/client/js/githubplanning.js']
	};