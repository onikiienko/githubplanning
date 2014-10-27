var room;
var socket = io();
var gamers = {};
var resultsOfAGame;

// console.log($('#myModal').modal);
$('#myModal').modal('show');

function loginGamer(){	
	$('#myModal').modal('hide');
	$('.createOrJoin').slideToggle();
	window.login = $('.gamerName').val();
	if(window.location.hash) {
		joinRoom();
	}
}

function setupRoom(){
	window.location.hash = '';
	$('.createOrJoin').slideToggle();
	$('.roomOptions').slideToggle();
}

function createRoom(){
	$('.roomOptions').slideToggle();
	$('.gameTable').slideToggle();
	if($('.roomName').val()){
		room = '/' + $('.roomName').val();
	}else{	
		room = '/' + makeid();
	}
	socket.emit('create room', room);
	socket = io(room);
	socketInit();
	window.location.hash = room;
	$('.alert-success').alert()
}	

function joinRoom(){
	if(window.location.hash) {
		socket = io(window.location.hash.substring(1));
		socketInit();
		$('.createOrJoin').slideToggle();
		$('.gameTable').slideToggle();
	} else {
	}
}

function socketInit(){
	socket.emit('add gamer', login);
	socket.on('update game', function(game){
		gamers = game;
		$(".table").empty();
		_.each(gamers, function(gamer){
			$(".table").append("<div class='" + gamer.login + " gamerCard'>" + gamer.login + "<br>" + gamer.point + "</div>");
			// console.log(gamer);
		})
	});
	socket.on('borders are', function(result){
		resultsOfAGame = result;
		console.log(resultsOfAGame);
	});
}

function vote(){
	var points = $('.points').val();
	socket.emit('gamer vote', login, points);
}

function makeid(){
	var text = "",
		possible = "0123456789";

	for( var i=0; i < 5; i++ )
	    text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}
function openCards(){
	socket.emit('choose borders');
}