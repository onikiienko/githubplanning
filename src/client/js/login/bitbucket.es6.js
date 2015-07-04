/*jshint globalstrict: true*/
define('login/bitbucket', ['underscore'],
	function(_){
		let publicKey = 'DR4zizVjOy_1ZXdtlmn0GBLoTcA';
		let iplayer = {};
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
			getIssues: function(api, project){
				console.log('/1.0/repositories/' + project.owner + '/' + project.name);
				return api.get('/api/1.0/repositories/' + project.owner + '/' + project.name);
			},
			prepareObjectForTemplate: function(player){
				player = window.player.toJSON();
				console.log(player);
				let avatar = player.player.user.avatar;
				let playerName = player.player.user.display_name;
				let firstProjectName = _.first(player.listOfProjects).owner + '/' + _.first(player.listOfProjects).name;
				let listProjects =  (function(player){
					let listProjects = {};
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