/*jshint globalstrict: true*/
define('views/createOrJoinView', [
	'text!templates/createOrJoinTemplate.html', 
	'backbone', 
	'jquery', 
	'underscore'
], function(createOrJoinTemplate, Backbone, $, _) {
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
			this.render();
		},
		render: function(){
			$(this.el).html(this.template(window.createOrJoinDataForTemplate));
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
			api.get('/repos/' + projectName + '/issues').done(function(data){
				that.model.set('issues', data);
				//get collaborators of a project
				api.get('/repos/' + projectName + '/collaborators').done(function(data){
					that.model.set('collaborators', data);
					that.socketInit();
					window.game = that.model;
				});
			});
		},
		socketInit: function(){
			let playerData = this.model.toJSON();
			let gameData = window.player.toJSON();
			let roomName = '/' + this.model.toJSON().name;
			socket.emit('enter room', playerData, gameData);
			// socket = io(roomName);
		}
	});
	return CreateOrJoinView;
});