angular.module('app')
.controller('RemoteCtrl', function($scope){
	var socket = io();
	$scope.tuneInTo = function(myName, broadcasterName){
		var peer = new Peer(myName, {host: 'localhost', port: 3030, path: '/peerjs'});

		var call = peer.call(broadcasterName);
		console.log(call);
			// 	call.on('stream', function(remoteStream) {
			// 		var remoteVideo = document.getElementById('remote');
			// 		remoteVideo.src = window.URL.createObjectURL(remoteStream);
			// 		remoteVideo.onloadedmetadata = function(e) {
			// 			remoteVideo.play();
			// 		};
			// 	});
			// }, 
			// function(err) {
			// 	console.log('Failed to get local stream' ,err);
			// });

			// peer.on('call', function(call) {
			// 	console.log('call came in', call)
			// 	navigator.getUserMedia({video: true, audio: true}, function(stream) {
   //   			call.answer(stream); // Answer the call with an A/V stream. 
   //   			call.on('stream', function(remoteStream) {
   //     				// Show stream in some <video> element. 
   //     			});
   //   		}, 
	  //    	function(err) {
	  //    		console.log('Failed to get local stream' ,err);
	  //    	}); 
			// 	});
			// };
		};
	})