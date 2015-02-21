'use strict';

module.exports = {
	clientModels:{
	    expand: true,
	    cwd: 'src/client/js',
	    src: ['**/*.js', '**/*.html'],
	    dest: 'build/client/js/'
	},
	serverjs: {
	    expand: true,
	    cwd: 'src/server',
	    src: '**',
	    dest: 'build/server',
	    flatten: true,
	    filter: 'isFile',
	},
	utils: {
		expand: true,
	    cwd: 'src/client/utils',
	    src: '**',
	    dest: 'build/client/utils',
	    flatten: true,
	    filter: 'isFile',
	},
	html: {
    	src: 'src/client/index.html',
    	dest: 'build/client/index.html',
  	}
}