angular.module('app')
.controller('HomeCtrl', function($scope){
	var userReady = false; 
	$scope.setUser = function(user, userToCall){
		console.log(user);
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		var user = user;
		var userToCall = userToCall; 
		userReady = !userReady; 

		if(userReady){
			var socket = io();
			var peer = new Peer(user, {host: 'localhost', port: 3030, path: '/peerjs'});
			
			var conn = peer.connect(userToCall);
			conn.on('open', function(){
				conn.send('hi!');
			});

			peer.on('connection', function(conn) {
				conn.on('data', function(data){
			    	// Will print 'hi!' 
			    	console.log(data);
				});
			});


			navigator.getUserMedia({
				video: true, audio: false
			}, 
			function(stream) {
				var localVideo = document.querySelector('#local');
				localVideo.src = window.URL.createObjectURL(stream);

				var call = peer.call(userToCall, stream);
				call.on('stream', function(remoteStream) {
					var remoteVideo = document.getElementById('remote');
					remoteVideo.src = window.URL.createObjectURL(remoteStream);
					remoteVideo.onloadedmetadata = function(e) {
						remoteVideo.play();
					};
				});
			}, 
			function(err) {
				console.log('Failed to get local stream' ,err);
			});

			peer.on('call', function(call) {
				console.log('call came in', call)
				navigator.getUserMedia({video: true, audio: true}, function(stream) {
     			call.answer(stream); // Answer the call with an A/V stream. 
     			call.on('stream', function(remoteStream) {
       				// Show stream in some <video> element. 
       			});
     		}, 
	     	function(err) {
	     		console.log('Failed to get local stream' ,err);
	     	}); 
				});
			};
	};
})
