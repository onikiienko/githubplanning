'use strict';

module.exports = {
	customjs: {
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