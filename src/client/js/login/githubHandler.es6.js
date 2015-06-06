/*jshint globalstrict: true*/

define('login/githubHandler', ['underscore'],
	function(_){
		let publicKey = 'DR4zizVjOy_1ZXdtlmn0GBLoTcA';
		return{
			signInAndFillData: function(player){
				let that = this;
				let projectList = [];
				let user = {};
				let playerAPI = {};
				// let player = window.player;
				this.signIn()
				.then(function(api){
					player.set('playerAPI', api);
					playerAPI = api;
				}).then(function(){					
					that.getRepos(playerAPI)
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
					});

					that.getUserData(playerAPI)
					.then(function(data){
						user = {
							login: data.login,
							name: data.name,
							avatar: data.avatar_url
						};
						player.set('player', user);
					});
				})
				
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
			getIssues: function(api, project, model){
				api
				.get('/repos/' + project + '/issues')
				.then(function(data){
					model.set('issues', data);
				});
			},
			getCollaborators: function(api, project, model){
				api
				.get('/repos/' + project + '/collaborators')
				.then(function(data){
					model.set('collaborators', data);
				});
			}
		}
	}
);