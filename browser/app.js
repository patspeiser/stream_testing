angular.module('app', ['ui.router']);

angular.module('app')
	.run(function($state){
		$state.go('home');
	});

angular.module('app')
	.config(function($stateProvider){
		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'HomeCtrl',
				resolve: {
					user: function(){
						return 'MyUser'
					}
				}
			})
			.state('remote', {
				url: '/remote',
				templateUrl: '/remote.html',
				controller: 'RemoteCtrl',
				resolve: {
					user: function(){
						return 'RemoteUser'
					}
				}
			})
	})