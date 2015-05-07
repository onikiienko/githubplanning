/*jshint globalstrict: true*/
define('login/bitbucketHandler', ['underscore'],
	function(_){
		var publicKey = 'DR4zizVjOy_1ZXdtlmn0GBLoTcA';
		var iplayer = {};
		return{
			//http://restbrowser.bitbucket.org/
			signIn: function(){
				OAuth.initialize(publicKey);
				return OAuth.popup('bitbucket');
			},
			getRepos: function(api){
				return api.get('/api/1.0/user/repositories/');
			},
			getUserData: function(api){
				return api.get('/api/1.0/user/');
			},
			prepareObjectForTemplate: function(player){
				player = window.player.toJSON();
				console.log(player);
				var avatar = player.player.user.avatar;
				var playerName = player.player.user.display_name;
				var firstProjectName = _.first(player.listOfProjects).owner + '/' + _.first(player.listOfProjects).name;
				var listProjects =  (function(player){
					var listProjects = {};
					_.each(player.listOfProjects, function(project){
						listProjects.name = project.owner + '/' + project.name;
						listProjects.description = project.description;
					})
					return listProjects;
				})(player);
				window.app_router.navigate("#create_or_join", {trigger: true});
				return {
					avatar: avatar,
					playerName: playerName,
					firstProjectName: firstProjectName,
					listProjects: listProjects
				}
			}
		}
	}
);