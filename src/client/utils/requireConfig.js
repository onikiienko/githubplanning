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
		jquery: 'utils/jquery',
		underscore: 'utils/underscore',
		backbone: 'utils/backbone',
		localsStorage:'utils/backbone.localStorage-min',
		oauth: 'utils/oauth',
		text: 'utils/text',
		isMobile: 'utils/isMobile',
		socketIO: 'utils/socket.io',
		marionette: 'utils/backboneMarionette',
		fontawesome: 'utils/font/css/font-awesome.min',
		showdown: 'utils/showdown',
		models: 'js/models',
		collections: 'js/collections',
		views: 'js/views',
		login: 'js/login',
		router: 'js/router',
		io: 'js/io',
		js: 'js',
		templates: 'js/templates'
	}
})