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
					},
					AT: function(){
						return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2M3YjMxZWZmNTA2MTliYzVmM2JhNmQ3MGMwZjkyMWE0LTE0NzkxODA5NTAiLCJpc3MiOiJTS2M3YjMxZWZmNTA2MTliYzVmM2JhNmQ3MGMwZjkyMWE0Iiwic3ViIjoiQUMxYmQyY2MwOWExYzkyODIwZTVlMjU2ZTY1Y2VjMGIyYiIsImV4cCI6MTQ3OTE4NDU1MCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoibGl2ZV9zdHJlYW1fdGVzdCIsInJ0YyI6eyJjb25maWd1cmF0aW9uX3Byb2ZpbGVfc2lkIjoiVlMzYjA3ZWQzYzllN2Q2ZDcyNGI4NDAzYTc1MWRhOTZjMCJ9fX0.Qf0nqmpEG__2Q67Ee1DUv3batjPEz0g5YRDRJ8G5HeQ'
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