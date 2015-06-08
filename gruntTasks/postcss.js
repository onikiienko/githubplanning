module.exports = {
	options: {
		map: true,
		processors: [
			require('autoprefixer-core')({browsers: 'last 1 version'})
		]
	},
	dist: {
		src: 'build/client/css/*.css'
	}
};