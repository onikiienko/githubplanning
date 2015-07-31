/*jshint globalstrict: true*/

define('login/bitbucket', [
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
        return OAuth.popup('bitbucket', {cache: true});
      },

      getRepos: function(){
        let projectList = [];

        return OAuth.create('bitbucket').get('/api/1.0/user/repositories/')
          .then(function(projects){
            console.log(projects);
            _.each(projects, function(project){
              projectList.push({
                name: project.name,
                owner: project.owner,
                description: project.description
              });
            });
            appData.projectsModel.set({listOfProjects: projectList});
          });
      },

      getUserData: function(){
        let user = {};

        OAuth.create('bitbucket').get('/api/1.0/user/')
          .then(function(data){
            console.log(data);
            appData.headerModel.set({
              login: data.user.username,
              name: data.user.display_name,
              avatar: data.user.avatar
            });
          });
      }
    }
  }
);