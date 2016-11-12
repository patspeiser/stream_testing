angular.module('app')
.controller('HomeCtrl', function($scope){
	var socket = io();

	$scope.broadcast = function(user){
		//this starts my broadcast
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		var user = user;
		var peer = new Peer(user, {host: 'localhost', port: 3030, path: '/peerjs'});

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
		peer.on('call', function(call) {
			console.log(call)
			navigator.getUserMedia({video: true, audio: true}, function(stream) {
	    		call.answer(stream); // Answer the call with an A/V stream. 
    			call.on('stream', function(remoteStream) {
      			// Show stream in some <video> element. 
  				});
			}, function(err) {
				console.log('Failed to get local stream' ,err);
			});
		});	
	};
})
