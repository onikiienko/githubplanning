module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	concat: {
		dist: {
			src: ['client/js/views/startView.js', 'client/js/views/loginView.js', 'client/js/views/createOrJoinView.js', 'client/js/views/tableView.js'],
			dest: 'client/js/<%= pkg.name %>.js'
		}
	},
	jshint: {
		beforeconcat: ['client/js/views/startView.js', 'client/js/views/loginView.js', 'client/js/views/createOrJoinView.js', 'client/js/views/tableView.js', 'app.js', 'client/js/script.js'],
		afterconcat: ['client/js/<%= pkg.name %>.js']
	},
	uglify: {
      build: {
        src: 'client/js/<%= pkg.name %>.js',
        dest: 'client/js/<%= pkg.name %>.min.js'
      }
    },
	watch: {
		scripts: {
			files: ['client/js/views/*.js', 'app.js', 'client/js/script.js'],
			tasks: ['concat', 'jshint', 'uglify']
		}
	}
});

// Load the plugin that provides the "uglify" task.
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-concat');

// Default task(s).
grunt.registerTask('default', ['watch']);
grunt.registerTask('build', ['concat', 'jshint', 'uglify']);
};