angular.module('app')
.factory('AuthService', function($http){
	return {
		getToken: function(){
			return $http.get('/token')
			.then(function(result){
				return result.data
			});
		}
	}

})