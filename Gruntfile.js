module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		concat 			: require('./gruntTasks/concat'),
		jshint 			: require('./gruntTasks/jshint'),
		uglify 			: require('./gruntTasks/uglify'),
		less 			: require('./gruntTasks/less'),
		sass 			: require('./gruntTasks/sass'),
		postcss 		: require('./gruntTasks/postcss'),
		copy 			: require('./gruntTasks/copy'),
		watch 			: require('./gruntTasks/watch'),
		babel 			: require('./gruntTasks/babel'),
		remove 			: require('./gruntTasks/remove'),
		karma			: require('./gruntTasks/karma')
	});

	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-remove');
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-postcss');

	// Default task(s).
	grunt.registerTask('default', ['browserSync', 'devbuild', 'watch']);
	grunt.registerTask('devbuild', ['remove', 'babel', 'less', 'styles', 'copy', 'jshint']);
	grunt.registerTask('build', ['remove', 'babel', 'less', 'copy', 'jshint', 'uglify']);
	grunt.registerTask('test', ['karma']);
	grunt.registerTask('styles', ['sass', 'postcss']);
};