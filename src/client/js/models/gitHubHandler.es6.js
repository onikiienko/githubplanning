define('models/githubHandler', [],
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
			getUserData: function(api){
				return api.get('/user');
			}
		}
	}
);