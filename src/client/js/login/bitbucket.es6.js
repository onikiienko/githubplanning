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

      signIn: function(){
        OAuth.initialize(publicKey);
        return OAuth.popup('bitbucket', {cache: true});
      },

      getRepos: function(){
        let projectList = [];

        return OAuth.create('bitbucket').get('/api/1.0/user/repositories/')
          .then(function(projects){
            _.each(projects, function(project){
              let url = "https://bitbucket.org" + project.resource_uri.slice(17);
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

      getIssues: function(project){
        let listOfProjects = appData.projectsModel.get('listOfProjects');
        let projectName = project.substr(project.indexOf('/') + 1);
        let projectId = _.findWhere(listOfProjects, {name: projectName}).id;

        OAuth.create('bitbucket').get('api/1.0/repositories/' + project + '/issues')
        .then(function(issues){
          _.each(issues, function(issue){
            if (!_.isEmpty(issue)){
              issue = issue[0];
              let issueBodyMD = issue.content;
              let md = window.markdownit();
              let body = md.render(issueBodyMD);
              let title_url = "https://bitbucket.org" + issue.resource_uri.slice(17);
              appData.tasksCollection.add({
                title: issue.title,
                title_url: title_url,
                body: body,
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
      //
    }
  }
);