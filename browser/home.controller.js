angular.module('app')
.controller('HomeCtrl', function($scope, user){
	$scope.user = user;
	// var socket = io();
	var connection = new RTCMultiConnection();

	// this line is VERY_important
	connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

	// all below lines are optional; however recommended.

	connection.session = {
		audio: true,
		video: true
	};

	connection.sdpConstraints.mandatory = {
		OfferToReceiveAudio: true,
		OfferToReceiveVideo: true
	};

	connection.onstream = function(event) {
		document.body.appendChild( event.mediaElement );
	};

	var predefinedRoomId = 'PATS';

	document.getElementById('open-room').onclick = function() {
	    this.disabled = true;
	    connection.open( predefinedRoomId );
	};

	document.getElementById('join-room').onclick = function() {
	    this.disabled = true;
	    connection.join( predefinedRoomId );
};


})
