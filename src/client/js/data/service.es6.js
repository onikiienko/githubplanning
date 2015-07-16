/*jshint globalstrict: true*/
define('data/service', [
	'backbone',
    'collections/contributors',
    'collections/selectCards',
    'collections/tasks',
    'collections/cards',
    'collections/chat',
    'models/projects',
    'models/header'
	], function(Backbone, ContributorsCollection, SelectCardsCollection, TasksCollection, CardsCollection, ChatCollection, ProjectsModel, HeaderModel){
		let contributorsCollection = new ContributorsCollection();
		let selectCardsCollection = new SelectCardsCollection();
		let cardsCollection = new CardsCollection();
		let chatCollection = new ChatCollection();
		let tasksCollection = new TasksCollection();
		let headerModel = new HeaderModel();
		let projectsModel = new ProjectsModel();

		selectCardsCollection.add([{'0': 0}, {'0.5' : 1}, {'1' : 2}, {'2' : 3}, {'3' : 4}, {'5' : 5}, {'8' : 6}, {'13' : 7}, {'20' : 8}, {'40' : 9}, {'100' : 10}, {'?' : 12}]);

		return {
			contributorsCollection: contributorsCollection,
			selectCardsCollection: selectCardsCollection,
			cardsCollection: cardsCollection,
			chatCollection: chatCollection,
			tasksCollection: tasksCollection,
			projectsModel: projectsModel,
			headerModel: headerModel
		};
	});