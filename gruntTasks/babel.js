'use strict';

module.exports =  {
    dist: {
        files: [{
		    expand: true,
		    cwd: 'src/client/js',
		    src: ['**/*.es6.js'],
		    dest: 'build/client/js',
		    ext: '.js'
        }]
    }
};