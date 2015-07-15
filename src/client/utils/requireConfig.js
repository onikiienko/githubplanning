'use strict';

require.config({
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		collections: 'js/collections',
		models: 'js/models',
		views: 'js/views',
		templates: 'js/templates',
		io: 'js/io',
		login: 'js/login',
		router: 'js/router/router',
		data: 'js/data',
		jquery: 'utils/jquery',
		underscore: 'utils/underscore',
		backbone: 'utils/backbone',
		oauth: 'utils/oauth',
		text: 'utils/text',
		isMobile: 'utils/isMobile',
		socketIO: 'utils/socket.io',
		js: 'js',
	}
})