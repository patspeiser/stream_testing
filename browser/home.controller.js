angular.module('app')
.controller('HomeCtrl', function($scope, user){
	var socket = io();
	$scope.user = user;
	var peer = new Peer(user, {host: 'localhost', port: 3030, path:'/peerjs', debug: 1});

	peer.on('connection', function(conn) {
		conn.on('data', function(data){
		    // Will print 'hi!' 
    		console.log('_____CONNECTION____');
		});
	});

	peer.on('call', function(call) {
		navigator.getUserMedia({video: true, audio: true}, function(stream) {
	    		call.answer(stream); // Answer the call with an A/V stream.
	    		console.log('does call ever happen?'); 
	    		call.on('stream', function(remoteStream) {
      			// Show stream in some <video> element. 
      		});
	    	}, function(err) {
	    		console.log('Failed to get local stream' ,err);
	    	});
	});	

	$scope.broadcast = function(){
		//this starts my broadcast
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		console.log(peer);
		navigator.getUserMedia({
			video: true, audio: false
		}, 
		function(stream) {
			var localVideo = document.querySelector('#local');
			localVideo.src = window.URL.createObjectURL(stream);
		}, 
		function(err) {
			console.log('Failed to get local stream' ,err);
		});

		//this accepts connects when I'm broadcasting
		
	};
})
