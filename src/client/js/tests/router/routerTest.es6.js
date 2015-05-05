/*jshint globalstrict: true*/
var expect = chai.expect;
var app_router;

define(['router/router', 'backbone'], function(Router, Backbone){
	describe("Router", function() {
		before(function(){
    		app_router = new Router();
    		Backbone.history.start();
		});
	  	describe("redirect", function() {
		    it("admin page", function() {
				app_router.navigate("admin");
		    	expect(Backbone.history.getFragment()).to.equal("admin");
		    });
		    it("default page", function() {
				app_router.navigate("");
		    	expect(Backbone.history.getFragment()).to.equal("");
		    });
		});
	});
})