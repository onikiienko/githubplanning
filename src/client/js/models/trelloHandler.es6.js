define('models/trelloHandler', ['underscore'],
	function(){
		var publicKey = 'DR4zizVjOy_1ZXdtlmn0GBLoTcA';
		return{
			signIn: function(){
				OAuth.initialize(publicKey);
				return OAuth.popup('trello');
			},
			getRepos: function(api){
				return api.get('/1/members/my/boards', function(a){
					console.log(a);
				});
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