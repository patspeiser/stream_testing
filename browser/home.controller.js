angular.module('app')
.controller('HomeCtrl', function($scope, user, AT){
	var socket = io();
	var Video = Twilio.Video;
	var client = new Video.Client(AT);
	var localMedia = new Video.LocalMedia();

	$scope.startWebcam = function(){
		Video.getUserMedia()
		.then(function(stream){
			localMedia.addStream(stream);
		});
	};

	$scope.stopWebcam = function(){
		localMedia.stop();
	};

	$scope.connectToRoom = function(room){
		Video.getUserMedia()
		.then(function(stream){
			localMedia.addStream(stream);
			localMedia.attach('#local-video');
			
			client.connect({
				to: room, 
				localMedia: localMedia
			})
			.then(function(room){
				console.log('connected to room "%s"', room.name);
				$scope.participants = [];
				console.log('stream', stream);
					//After I connect to the room I get room info.
					//I'm just getting some of that here and setting it to the scope
					$scope.localParticipant = room.localParticipant;

					// //these functions act as listeners
					// //They check when a user joins or leaves 
					// //and emits an event
					room.once('participantConnected', function(participant){
						console.log('"%s" connected', participant.identity);
					});

					room.once('participantDisconnected', function(participant){
						console.log('"%s" disconnected', participant.identity);
					});

				})
			.catch(function(err){
				console.log('Failed to connect to the room', err)
			})
		});
	}



})
