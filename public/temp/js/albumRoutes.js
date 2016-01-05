angular.module('albumRoutes', ['ngRoute']).
		config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/album/picwall.html'
			})
			.when('/picwall', {
				templateUrl: 'views/album/picwall.html'
			})
			.when('/list', {
				templateUrl: 'views/album/list.html'
			})
			.when('/film', {
				templateUrl: 'views/album/film.html'
			})
			.when('/private', {
				templateUrl: 'views/album/private.html'
			})
			.when('/black', {
				templateUrl: 'views/album/black.html'
			});

//		$locationProvider.html5Mode(false); //html5模式
//		$locationProvider.hashPrefix('!');

}]);
