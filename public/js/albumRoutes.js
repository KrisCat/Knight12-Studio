angular.module('albumRoutes', []).
		config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$routeProvider

			// home page
			.when('/', {
				templateUrl: 'views/album/all.html'
			})

			.when('/all', {
				templateUrl: 'views/album/all.html'
			})

			.when('/people', {
				templateUrl: 'views/album/people.html'
			})
			.when('/film', {
				templateUrl: 'views/album/film.html'
			})

			.when('/travel', {
				templateUrl: 'views/album/travel.html'
			});

//		$locationProvider.html5Mode(false); //html5模式
//		$locationProvider.hashPrefix('!');

}]);
