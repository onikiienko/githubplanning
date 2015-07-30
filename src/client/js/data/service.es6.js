/*jshint globalstrict: true*/
define('data/service', [
	'backbone',
    'collections/contributors',
    'collections/tasks',
    'collections/cards',
    'collections/chat',
    'collections/selectCards',
    'models/projects',
    'models/header'
	], function(Backbone, ContributorsCollection, TasksCollection, CardsCollection, ChatCollection, SelectCardsCollection, ProjectsModel, HeaderModel){
		let contributorsCollection = new ContributorsCollection();
		let selectCardsCollection = new SelectCardsCollection();
		let cardsCollection = new CardsCollection();
		let chatCollection = new ChatCollection();
		let tasksCollection = new TasksCollection();
		let headerModel = new HeaderModel();
		let projectsModel = new ProjectsModel();


		return {
			contributorsCollection: contributorsCollection,
			cardsCollection: cardsCollection,
			chatCollection: chatCollection,
			tasksCollection: tasksCollection,
			selectCardsCollection: selectCardsCollection,
			projectsModel: projectsModel,
			headerModel: headerModel
		};
	});