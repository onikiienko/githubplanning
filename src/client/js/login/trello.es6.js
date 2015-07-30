/*jshint globalstrict: true*/

define('login/trello', [
	'backbone',
	'underscore',
	'data/service'
], function(Backbone, _, appData){
		let publicKey = 'DR4zizVjOy_1ZXdtlmn0GBLoTcA';

		return{
			signInAndFillData: function(){
							let that = this;

							// if(OAuth.create('trello')){
							// 	this.getRepos();
							// 	this.getUserData();
							// }else{
								this.signIn()
								.then(function(){
									that.getRepos();
									that.getUserData();
								})
							// }
						},

			signIn: function(){
				OAuth.initialize(publicKey);
				return OAuth.popup('trello', {cache: true});
			},

			getRepos: function(){
				let projectList = [];

				return OAuth.create('trello').get('/1/members/my/boards')
				.then(function(projects){
					_.each(projects, function(project){
						projectList.push({
							name: project.name
						});
					});
					appData.projectsModel.set({listOfProjects: projectList});
				});
			},

			getUserData: function(){
				let user = {};

				OAuth.create('trello').get('/1/members/me')
				.then(function(data){
					appData.headerModel.set({
						login: data.username,
						name: data.fullName,
						avatar: 'https://trello-avatars.s3.amazonaws.com/' + data.avatarHash + '/50.png'
					});
				});
			}
		}
	}
);