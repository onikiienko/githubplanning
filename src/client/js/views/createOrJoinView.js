require(['text!/js/templates/createOrJoinTemplate.html'], function(createOrJoinTemplate) {
	window.CreateOrJoinView = Backbone.View.extend({
		el: '.content',
		events: {
			"click .enterRoomBtn" : "createRoom",
			"click .roomNameInput" : "openRoomNameList",
			"click .roomNameListItem" : "chooseProject",
			"click .currencyType" : "makeRadioChecked"
		},
		isNewer: true,
		initialize: function(){
			this.listenTo(this.model, 'change:player', this.render);
		},
		render: function(){
			var template = _.template(createOrJoinTemplate);
			$(this.el).html(template(player.toJSON()));
		},
		createRoom: function(){
			this.getProjectData();
			// tableModule.set({'room': $('.roomNameInput').val()});

			// var room  = '/' + tableModule.toJSON().room;
			// var currencyType = $('input:checked').prop('value');
			// var login = tableModule.toJSON().login;
			
			// socket.emit('enter room', room, currencyType, login);
			// socket = io(room);
			// this.socketInit();
			// window.location.hash = room;
		},
		openRoomNameList: function(){
			$('.roomNameList').show();
		},
		chooseProject: function(target){
			//pick project and write in input
			var choosenProject = $(target.target)
					.closest('.roomNameListItem')
					.find('.roomNameListItemHeaderTitle')
					.html()
					.replace(/\s+/g, '');
			$('.roomNameInput').html(choosenProject);
			$('.roomNameList').hide();
		},
		makeRadioChecked: function(target){
			console.log($(target.target));
			if ($(target.target).hasClass('checked')){				
				$('.radioBtn').removeClass('checked');
			}else{
				$('.radioBtn').removeClass('checked');
				$(target.target).addClass('checked');
			}
		},
		getProjectData: function(){
			var projectName = $('.roomNameInput').html();
			var api = this.model.toJSON().playerAPI;
			//get issues of a project
			api.get('/repos/' + projectName + '/issues').done(function(data){
				window.player.set('issues', data);
				//get collaborators of a project
				api.get('/repos/' + projectName + '/collaborators').done(function(data){
					window.player.set('collaborators', data);
				});
			});
		},
		joinRoom: function(room){
			tableModule.set({'room': room.substring(1)});
			var login = tableModule.toJSON().login;
			socket.emit('enter room', room, undefined, login);
			socket = io(room);
			this.socketInit();
		},
		socketInit: function(){
			var that = this;
			socket.on('connectionReady', function(cards, table, gamers){
				if (that.isNewer){
					tableView.render();
					cardsToChooseCollection.set(cards);
					tableView.renderCardsToChoose();
					if(table.length){
						gameZoneCollection.set(table);
						tableView.renderGameZone();
					}
					that.isNewer = false;
				}		
				gamersListCollection.set(gamers);
				tableView.renderGamersList();
				
			});
			socket.on('updateTable', function(table, gamers){
				gameZoneCollection.set(table);
				if (gamers){
					gamersListCollection.set(gamers);
				}
				tableView.renderGameZone();
				tableView.renderGamersList();
			});
			socket.on('chat message', function(msg, login){
				tableView.renderMessage(msg, login);
			});
			socket.on('flipCards', function(msg, login){
				$('.flipper').addClass('hover');
			});
		}
	});
	new CreateOrJoinView({model : window.player});
});