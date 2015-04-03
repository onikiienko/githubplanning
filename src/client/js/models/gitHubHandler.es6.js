define('models/gitHubHandler', ['underscore'],
	function(){
		var publicKey = 'DR4zizVjOy_1ZXdtlmn0GBLoTcA';
		return{
			signIn: function(){
				OAuth.initialize(publicKey);
				return OAuth.popup('github');
			},
			getRepos: function(api){
				return api.get('/user/repos');
			},
			getOrganizations: function(api){
				return api.get('/user/orgs');
			},
			getUserData: function(api){
				return api.get('/user');
			}
		}
	}
);