/* functions for general use */

/* This function returns the value associated with 'whichParam' on the URL */

function getURLParameters(whichParam) 
{
	var pageURL = window.location.search.substring(1);
	var pageURLVariables = pageURL.split('&');
	for(var i=0; i<pageURLVariables.length; i++){
		var paramaterName = pageURLVariables[i].split('=');
		if (paramaterName[0] == whichParam) {
			return paramaterName[1];
		}
	}
}

var username = getURLParameters('username');
if ('undefined' == typeof username || !username){
	username = 'Anonymous_'+Math.random();
}

var chat_room = 'One_Room';

/* Connect to the socket server */

var socket = io.connect();

socket.on('log', function(array){
	console.log.apply(console,array);
});

socket.on('join_room_response', function(payload){ // Join room response
	console.log("here");
	if (payload.result == 'fail'){
		alert(payload.message);
		return;
	}
	$('#messages').append('<p>New user joined the room: '+payload.username+'</p>');
});

socket.on('send_message_response', function(payload){ // Send message response
	console.log("here");
	if (payload.result == 'fail'){
		alert(payload.message);
		return;
	}
	$('#messages').append('<p><b>'+payload.username+' says:</b> '+payload.message+'</p>');
});


function send_message(){ // setting up the message variable with content
	var payload = {};
	payload.room = chat_room;
	payload.username = username;
	payload.message = $('#send_message_holder').val();
	console.log('*** Client Log Message: \'send_message\' payload: '+JSON.stringify(payload));
	socket.emit('send_message', payload);
}

$(function(){
	var payload = {};
	payload.room = chat_room;
	payload.username = username;
	
	console.log('*** Client Log Message: \'join_room\ payload: ' + JSON.stringify(payload));
	socket.emit('join_room', payload);
});



//$('#messages').append('<h4>'+username+'</h4>');
















