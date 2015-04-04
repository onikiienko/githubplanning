define('models/trelloHandler', [],
	function(){
		var publicKey = 'DR4zizVjOy_1ZXdtlmn0GBLoTcA';
		return{
			//https://trello.com/docs/api/
			signIn: function(){
				OAuth.initialize(publicKey);
				return OAuth.popup('trello');
			},
			getRepos: function(api){
				return api.get('/1/members/my/boards');
			},
			getUserData: function(api){
				return api.get('/1/members/me');
			}
		}
	}
);