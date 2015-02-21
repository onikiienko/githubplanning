'use strict';

module.exports = { 
		beforeconcat: [
			'src/client/js/views/*.js', 
			'src/client/js/models/*.js', 
			'src/client/js/collections/*.js', 
			'src/server/*.js',
			'app.js'
		],
		afterconcat: ['build/client/js/githubplanning.js']
	};