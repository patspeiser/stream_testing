angular.module('app')
.controller('RemoteCtrl', function($scope, user){
	var socket = io();
	$scope.user = user;
	var peer = new Peer(user, {host: 'localhost', port: 3030, path: '/peerjs', debug: 1});
	console.log('__PEER__', peer);
	// var conn = peer.connect('MyUser');
	// console.log('__CONN__', conn);
	peer.on('error', function(err){
		console.log('__ERROR__', err);
	});


	$scope.tuneInTo = function(broadcasterName){
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
		navigator.getUserMedia({video: true, audio: false}, 
			function(stream) {
				var conn = peer.connect(broadcasterName)
				console.log('__CONN__', conn);
				var call = peer.call(broadcasterName, stream);
				console.log('__CALL__', call)
				call.on('stream', function(remoteStream){
					console.log('#### NOT GETTING HERE.####' );
					var remoteVideo = document.querySelector('#remote');
					remoteVideo.src = window.URL.createObjectURL(remoteStream);
				})
	    	}, 
	    	function(err) {
	    		console.log('Failed to get local stream' ,err);
	    	});
		};
	})