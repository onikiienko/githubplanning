var Player = Backbone.Model.extend({
  name : "value",
  listOfProjects: "value",  
  listOfOrganizations: "value", 
  avatar: "value",
  playerAPI: "value", 
  getName: function(playerAPI) {
  	this.playerAPI = playerAPI;
	return playerAPI.me()
	.done(function(me){
		window.player.name = me.name;
	})
	.fail(function (err) {
		console.log(err);
	});
  },
  getListOfProjects: function(){
	//get list of projects
	this.playerAPI.get('/user/repos').done(function(data){
		window.player.listOfProjects = data;
	});
  },
  getListOfOrganizations: function(playerAPI){
	//get organizations
	this.playerAPI.get('/user/orgs').done(function(data){
		if(data){
			window.player.listOfOrganizations = data;
		}
	});
  },
  getAvatar: function(playerAPI){
	// get users avatar
	this.playerAPI.get('/user').done(function(data){
		window.player.avatar = data.avatar_url;
	});
  },
  setEventHandlers: function(){  	
  }
});
window.player = new Player();
window.player.on({
	// "change:name": console.log('window.loginView'),
	// "change:author": authorPane.update,
	// "destroy": bookView.remove
});
