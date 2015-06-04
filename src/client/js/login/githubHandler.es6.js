/*jshint globalstrict: true*/

define('login/githubHandler', ['underscore'],
	function(_){
		let publicKey = 'DR4zizVjOy_1ZXdtlmn0GBLoTcA';
		return{
			signInAndFillData: function(player){
				let that = this;
				let projectList = [];
				let user = {};
				// let player = window.player;
				that.signIn()
				.then(function(api){
					player.set('playerAPI', api);
					return api;
				})
				.then(function(api){
					that.getRepos(api)
					.then(function(projects){
						_.each(projects, function(project){
							projectList.push({
								name: project.name,
								owner: project.owner.login,
								numberOfOpenIssues: project.open_issues,
								description: project.description
							});
						});
						player.set('listOfProjects', projectList);
					})
					return api;
				})
				.then(function(api){
					that.getUserData(api)
					.then(function(data){
						user = {
							login: data.login,
							name: data.name,
							avatar: data.avatar_url
						};
						player.set('player', user);
					})
					return api;
				})
				.fail(function (e) {
			        //handle errors here
			        console.log(400, 'An error occured', e);
			    });
			},
			signIn: function(){
				OAuth.initialize(publicKey);
				return OAuth.popup('github');
			},
			getRepos: function(api){
				return api.get('/user/repos');
			},
			getUserData: function(api){
				return api.get('/user');
			},
			getIssues: function(api, project){
				return api.get('/repos/' + project.owner + '/' + project.name + '/issues');
			},
			getCollaborators: function(api, project){
				return api.get('/repos/' + project.owner + '/' + project.name + '/collaborators');
			}
		}
	}
);