var Player = Backbone.Model.extend({
  name : "value",
  login : "value",
  listOfProjects: "value",  
  listOfOrganizations: "value", 
  avatar: "value",
  playerAPI: "value",
  setPlayerAPI: function(playerAPI) {
  	this.playerAPI = playerAPI;
  },
  getListOfProjects: function(){
	//get list of projects
	this.playerAPI.get('/user/repos').done(function(data){
		window.player.listOfProjects = data;
		new CreateOrJoinView();
	});
  },
  getListOfOrganizations: function(){
	//get organizations
	this.playerAPI.get('/user/orgs').done(function(data){
		if(data){
			window.player.listOfOrganizations = data;
		}
	});
  },
  getAccount: function(){
	// get users avatar
	this.playerAPI.get('/user').done(function(data){
		window.player.avatar = data.avatar_url;
		window.player.login = data.login;
		window.player.name = data.name;
	});
  },
  getIssues: function(project){
	//get issues of a project
	this.playerAPI.get('/repos/' + project + '/issues').done(function(b){
		console.log(b);
	});
  }
});
window.player = new Player();
