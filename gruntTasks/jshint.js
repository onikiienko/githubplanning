'use strict';

module.exports = { 
		beforeconcat: [
			'build/client/js/views/*.js', 
			'build/client/js/models/*.js', 
			'build/client/js/collections/*.js', 
			'build/server/*.js',
			'app.js'
		],
		afterconcat: ['build/client/js/githubplanning.js']
	};