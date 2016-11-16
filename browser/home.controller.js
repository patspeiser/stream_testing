angular.module('app')
.controller('HomeCtrl', function($scope, user, AuthService){
	AuthService.getToken()
	.then(function(token){
		console.log(token.token);
		var socket = io();
		var Video = Twilio.Video;
		var client = new Video.Client(token.token);
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

		$scope.connectToRoomOnly = function(room){
			console.log(room);
			console.log(client);
			client.connect({
				to: room, 
				localMedia: localMedia
			})
			.then(function(room){
				$scope.localParticipant = room.localParticipant;
				console.log('connected to the room', room, room.localParticipant);
				console.log(room.participants);
				room.participants.forEach(function(participant) {
					console.log("Already in Room: '" + participant.identity + "'");
					participant.media.attach('#remote-video');
				})
			})	
		}

		$scope.connectToRoomAndBroadcast = function(room){
			console.log('in broadcast', client, localMedia);
			Video.getUserMedia()
			.then(function(stream){
			//add the stream we just got to our localMedia channel
			//attach the channel to the local-video dom element
			localMedia.addStream(stream);
			localMedia.attach('#local-video');
			console.log(room, token.token);	
			//connect to the room
			client.connect({
				to: room, 
				localMedia: localMedia
			})
			.then(function(room){
				console.log('connected to room "%s"', room.name);
				$scope.participants = [];
				console.log('stream', stream);
					//After I connect to the room I get room info.
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
	});
})
