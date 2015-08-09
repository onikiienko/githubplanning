/*jshint globalstrict: true*/
//http://restbrowser.bitbucket.org/
define('login/bitbucket', [
    'backbone',
    'underscore',
    'data/service'
  ], function(Backbone, _, appData){
    let publicKey = 'DR4zizVjOy_1ZXdtlmn0GBLoTcA';

    return{
      signInAndFillData: function(){
        let that = this;

        this.signIn()
          .then(function(){
            that.getRepos();
            that.getUserData();
          })
      },

      getIssues: function(){
        let that = this;
        let playerAPI = {};

        if(OAuth.create('bitbucket')){
          this.getIssuesForCurrentProject();
          this.getUserData();
        }else{
          this.signIn()
          .then(function(){
            that.getIssuesForCurrentProject();
            that.getUserData();
          })
        }
      },

      signIn: function(){
        OAuth.initialize(publicKey);
        return OAuth.popup('bitbucket', {cache: true});
      },

      getRepos: function(){
        let projectList = [];

        return OAuth.create('bitbucket').get('/api/1.0/user/repositories/')
          .then(function(projects){
            _.each(projects, function(project){
              let url = "https://bitbucket.org" + project.resource_uri.replace(/(\/\d.\d\/\w+\/)/, '');
              projectList.push({
                name: project.name,
                url: url,
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
            appData.headerModel.set({
              login: data.user.username,
              name: data.user.display_name,
              avatar: data.user.avatar
            });
          });
      },

      getIssuesForCurrentProject: function(project){
        let listOfProjects = appData.projectsModel.get('listOfProjects');
        let projectName = project.substr(project.indexOf('/') + 1);
        let projectId = _.findWhere(listOfProjects, {name: projectName}).id;

        OAuth.create('bitbucket').get('api/1.0/repositories/' + project + '/issues')
        .then(function(issues){
          _.each(issues, function(issue){
            if (!_.isEmpty(issue)){
              issue = issue[0];
              let title_url = "https://bitbucket.org" + issue.resource_uri.replace(/(\/\d.\d\/\w+\/)/, '');
              appData.tasksCollection.add({
                title: issue.title,
                title_url: title_url,
                date: issue.created_on,
                contributor: {
                  name: issue.reported_by.display_name,
                  avatar: issue.reported_by.avatar
                }
              });
            }
          });
        });
      }
    }
  }
);