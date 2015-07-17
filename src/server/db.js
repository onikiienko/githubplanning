var MongoClient = require('mongodb').MongoClient;

(function(dbName, url){
	url = url + dbName;
	MongoClient.connect(url, function(err, db) {
		exports.db = db;
	});
})('rooms', 'mongodb://178.62.25.79:2700/')

exports.setRoom = function(db, data) {
	var collection = db.collection('roomCollection');

	collection.find(data).toArray(function(err, docs) {
		if (!docs.length) {
			collection.save(data);	
		}
	});
}

exports.getAllRooms = function(db, callback) {
	var collection = db.collection('roomCollection');
	
	collection.find({}).toArray(function(err, docs) {
		callback(docs, err);
	});
}

exports.clearCollection = function(db) {
	var collection = db.collection('roomCollection');
	
	collection.remove();
}