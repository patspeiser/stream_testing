angular.module('app', ['ui.router']);

angular.module('app')
	.run(function($state){
		$state.go('home');
	});

angular.module('app')
	.config(function($stateProvider){
		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: '/home.html',
				controller: 'HomeCtrl'
			})
	})