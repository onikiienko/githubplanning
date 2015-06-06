/*jshint globalstrict: true*/
define('views/createOrJoinView', [
	'text!templates/createOrJoinTemplate.html', 
	'backbone', 
	'jquery',
	'socketIO',
	'underscore'
], function(createOrJoinTemplate, Backbone, $, io, _) {
	let CreateOrJoinView = Backbone.View.extend({
		el: '.content',
		events: {
			"click .enterRoomBtn" : "createRoom",
			"click .roomNameInput" : "openRoomNameList",
			"click .roomNameListItem" : "chooseProject",
			"click .currencyType" : "makeRadioChecked"
		},
		template: _.template(createOrJoinTemplate),
		initialize: function(){
    		_.bindAll(this, 'render');
    		this.model.bind('change:listOfProjects', this.render);
		},
		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));
		},
		createRoom: function(){
			this.getProjectData();
		},
		openRoomNameList: function(){
			$('.roomNameList').show();
		},
		chooseProject: function(target){
			//pick project and write in input
			let choosenProject = $(target.target)
					.closest('.roomNameListItem')
					.find('.roomNameListItemHeaderTitle')
					.html()
					.replace(/\s+/g, '');
			$('.roomNameInput').html(choosenProject);
			this.model.set('name', choosenProject);
			$('.roomNameList').hide();
		},
		makeRadioChecked: function(target){
			if ($(target.target).hasClass('checked')){				
				$('.radioBtn').removeClass('checked');
			}else{
				$('.radioBtn').removeClass('checked');
				$(target.target).addClass('checked');
			}
		},
		getProjectData: function(){
			let projectName = $('.roomNameInput').html();
			let api = window.player.toJSON().playerAPI;
			let that = this;
			//get issues of a project
			api.get('/repos/' + projectName + '/issues')
				.then(function(data){
					console.log(data);
					that.model.set('issues', data);
					return api;
				})
				.then(function(api){
					api.get('/repos/' + projectName + '/collaborators').done(function(data){
						console.log(data);
						that.model.set('collaborators', data);
						that.socketInit();
					});
				});
		},
		socketInit: function(){
			let playerData = this.model.toJSON().player;
			let gameData = window.player.toJSON();
			let roomName = '/' + $('.roomNameInput').html();
			console.log(playerData, gameData, roomName);
			window.socket.emit('enter room', playerData, gameData);
			window.socket = io(roomName);
			window.socket.on('connectionReady', function(currency, table, gamersList){
				console.log(currency);
				console.log(table);
				console.log(gamersList);
			});
			window.app_router.navigate('#go_to_room/:roomName', {trigger: true});
		}
	});
	return CreateOrJoinView;
});