module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'client/js/views/startView.js', 
					'client/js/views/loginView.js', 
					'client/js/views/createOrJoinView.js', 
					'client/js/views/tableView.js'
				],
				dest: 'client/js/<%= pkg.name %>.js'
			}
		},
		jshint: {
			beforeconcat: [
				'client/js/views/startView.js', 
				'client/js/views/loginView.js', 
				'client/js/views/createOrJoinView.js', 
				'client/js/views/tableView.js', 
				'app.js', 
				'client/js/headerScroll.js', 
				'client/js/script.js'
			],
			afterconcat: ['client/js/<%= pkg.name %>.js']
		},
		uglify: {
	      build: {
	        src: 'client/js/<%= pkg.name %>.js',
	        dest: 'client/js/<%= pkg.name %>.min.js'
	      }
	    },
		less: {
			development: {
				options: {
					paths: ["client/css"]
				},
				files: {
					"client/css/styles.css": "client/css/styles.less"
				}
			},
			// production: {
			// 	options: {
			// 		paths: ["assets/css"],
			// 		plugins: [
			// 			new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
			// 			new (require('less-plugin-clean-css'))(cleanCssOptions)
			// 		],
			// 		modifyVars: {
			// 			imgPath: '"http://mycdn.com/path/to/images"',
			// 			bgColor: 'red'
			// 		}
			// 	},
			// 	files: {
			// 		"path/to/result.css": "path/to/source.less"
			// 	}
			// }
		},
		watch: {
			scripts: {
				files: ['client/js/views/*.js', 'app.js', 'client/js/script.js'],
				tasks: ['devbuild']
			},
			styles: {
				files: ['client/css/styles.less'],
				tasks: ['devbuild']
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');

	// Default task(s).
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['concat', 'jshint', 'uglify']);
	grunt.registerTask('devbuild', ['concat', 'jshint', 'less']);
};