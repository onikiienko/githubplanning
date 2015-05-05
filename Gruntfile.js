module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		concat : require('./gruntTasks/concat'),
		jshint: require('./gruntTasks/jshint'),
		uglify: require('./gruntTasks/uglify'),
		less: require('./gruntTasks/less'),
		copy: require('./gruntTasks/copy'),
		watch: require('./gruntTasks/watch'),
		babel: require('./gruntTasks/babel'),
		remove: require('./gruntTasks/remove'),
		mochaTest: require('./gruntTasks/test')
	});

	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-remove');

	// Default task(s).
	grunt.registerTask('default', ['devbuild', 'test', 'watch']);
	grunt.registerTask('devbuild', ['remove', 'babel', 'less', 'copy', 'jshint']);
	grunt.registerTask('build', ['devbuild', 'uglify']);
	grunt.registerTask('test', ['mochaTest']);
};