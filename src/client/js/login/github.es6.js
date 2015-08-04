/*jshint globalstrict: true*/

define('login/github', [
  'backbone',
  'underscore',
  'data/service'
], function(Backbone, _, appData){
    let publicKey = 'DR4zizVjOy_1ZXdtlmn0GBLoTcA';

    return{
      signInAndFillData: function(){
        let that = this;
        let playerAPI = {};

        if(OAuth.create('github')){
          this.getRepos();
          this.getUserData();
        }else{
          this.signIn()
          .then(function(){
            that.getRepos();
            that.getUserData();
          })
        }
      },

      signIn: function(){
        OAuth.initialize(publicKey);
        return OAuth.popup('github', {cache: true});
      },

      getRepos: function(){
        let projectList = [];

        return OAuth.create('github').get('/user/repos')
        .then(function(projects){
          _.each(projects, function(project){
            projectList.push({
              name: project.name,
              url: project.html_url,
              owner: project.owner.login,
              numberOfOpenIssues: project.open_issues,
              description: project.description
            });
          });
          appData.projectsModel.set({listOfProjects: projectList});
        });
      },

      getUserData: function(){
        let user = {};

        OAuth.create('github').get('/user')
        .then(function(data){
          appData.headerModel.set({
            login: data.login,
            name: data.name,
            avatar: data.avatar_url
          });
        });
      },

      getIssues: function(project){
        OAuth.create('github')
        .get('/repos/' + project + '/issues')
        .then(function(data){
          _.each(data, function(issue){
            appData.tasksCollection.add({
              title: issue.title,
              title_url: issue.html_url,
              date: issue.created_at,
              contributor: {
                name: issue.user.login,
                avatar: issue.user.avatar_url
              }
            });
          });
        });
      },

      getCollaborators: function(project, collection){
        OAuth.create('github')
        .get('/repos/' + project + '/collaborators')
        .then(function(data){
          _.each(data, function(collaborator){
            collection.add({
              login: collaborator.login,
              avatar: collaborator.avatar_url
            });
          });
        });
      }
    }
  }
);