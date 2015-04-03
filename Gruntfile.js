module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		concat : require('./gruntTasks/concat'),
		jshint: require('./gruntTasks/jshint'),
		uglify: require('./gruntTasks/uglify'),
		less: require('./gruntTasks/less'),
		copy: require('./gruntTasks/copy'),
		watch: require('./gruntTasks/watch'),
		babel: require('./gruntTasks/babel')
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-babel');

	// Default task(s).
	grunt.registerTask('default', ['devbuild','watch']);
	grunt.registerTask('devbuild', ['concat', 'babel', 'less', 'copy']);
	grunt.registerTask('build', ['devbuild', 'uglify']);
};