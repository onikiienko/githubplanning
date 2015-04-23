module.exports = { 
	options: {
	    jshintrc: true
	},
	beforeconcat: [
		'build/client/js/**/*.js', 
		'build/server/**/*.js', 
		// 'build/client/js/models/*.js', 
		// 'build/client/js/collections/*.js', 
		// 'build/server/*.js',
		'*.js',
		'gruntTasks/*.js'
	],
	afterconcat: ['build/client/js/githubplanning.js']
};