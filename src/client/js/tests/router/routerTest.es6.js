/*jshint globalstrict: true*/

let expect = chai.expect;

define(['router/router', 'backbone'], function(Router, Backbone){
	
	let app_router = {};
	
	describe("Router", function() {
		
		before(function(){
    		app_router = new Router();
    		Backbone.history.start();
		});
		after(function(){
			app_router = null;
			Backbone.history.stop();
		});
	  	
	  	describe("should redirect to", function() {
	  		
	  		describe("login page", function(){

		  		it("by login url", function(){
		  			app_router.navigate("#login", {trigger: true});
			    	expect(Backbone.history.getFragment()).to.equal("login");
		  		});

		  		it("by logout url", function(){
		  			app_router.navigate("#logout", {trigger: true});
			    	expect(Backbone.history.getFragment()).to.equal("login");
		  		});

		  		it("if fake url & not login", function(){
		  			app_router.navigate("#fakePage", {trigger: true});
		  			localStorage.setItem("player", null);
			    	expect(Backbone.history.getFragment()).to.equal("login");
		  		});

			    it("if fake url", function() {
					app_router.navigate("#fakePage", {trigger: true});
			    	expect(Backbone.history.getFragment()).to.equal("login");
			    });

			    it("if customer enter by link but not logged in", function() {
					app_router.navigate("#go_to_room/testRoomName", {trigger: true});
		  			localStorage.setItem("player", null);
			    	expect(Backbone.history.getFragment()).to.equal("login");
			    });

			    it("if go to create page but not logged in", function() {
					app_router.navigate("#create_or_join", {trigger: true});
			    	localStorage.setItem("player", null);
			    	expect(Backbone.history.getFragment()).to.equal("login");
			    });

		    });

		    describe("create or join page", function(){

			    it("logged in", function() {
					app_router.navigate("#create_or_join", {trigger: true});
			    	expect(Backbone.history.getFragment()).to.equal("create_or_join");
			    });

			    it("go to login but already logged in", function() {
					app_router.navigate("#login", {trigger: true});
			    	expect(Backbone.history.getFragment()).to.equal("create_or_join");
			    });

		  		it("logged in but have no access to room", function(){
		  			localStorage.setItem("player", {});
		  			app_router.navigate("#go_to_room/testRoomName", {trigger: true});
			    	expect(Backbone.history.getFragment()).to.equal("create_or_join");
		  		});

	  		});
		    describe("room page", function(){

			    it("if customer enter by link & logged in & have access to room", function() {
					app_router.navigate("#go_to_room/testRoomName", {trigger: true});
			    	expect(Backbone.history.getFragment()).to.equal("room/testRoomName");
			    });
			    
			    it("if customer enter from create page & logged in & have access to room", function() {
					app_router.navigate("#room/testRoomName", {trigger: true});
			    	expect(Backbone.history.getFragment()).to.equal("room/testRoomName");
			    });

		    });
		});
		
		describe("load", function(){
			
			it("start view", function(){
				app_router.navigate("#", {trigger: true});
		    	expect(typeof window.startView).to.equal("object");
			});
			
			it("create or join view", function(){
				app_router.navigate("#create_or_join", {trigger: true});
		    	expect(typeof window.createOrJoinView).to.equal("object");
			});
			
			it("room view", function(){
				app_router.navigate("#o_to_room/testRoomName", {trigger: true});
		    	expect(typeof window.roomView).to.equal("object");
			});
		});

	});

});