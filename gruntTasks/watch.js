module.exports = {
	scripts: {
		files: ['src/**/*', '*.js', 'gruntTasks/*.js', 'test/*.js'],
		tasks: ['devbuild']
	},
	css: {
		files: ['src/client/css/*scss'],
		tasks: ['styles']
	}
};