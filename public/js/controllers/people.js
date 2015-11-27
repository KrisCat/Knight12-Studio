angular.module('people', ['ngRoute'])
	// 启动前路由配置
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/common/picwall.html',
				controller: 'picwall',
			})
			.when('/picwall', {
				templateUrl: 'views/common/picwall.html',
				controller: 'picwall',
			})
			.when('/list/:type', {
				templateUrl: 'views/common/list.html',
				controller: 'list',
			})
			.otherwise({
				redirectTo: '/'
			});
	}])
    // 运行块
	.run(function ($rootScope, $routeParams, $http) {
		// 根数据初始化
		$rootScope.showPicWall = {};
		$rootScope.showList = [];
		$rootScope.temp_all = [];
		$rootScope.temp_environment = [];
		$rootScope.temp_black = [];
		$rootScope.temp_film = [];
		$rootScope.temp_private = [];
		$rootScope.state = [];
		$rootScope.listTypeConfirm = function () {
			$routeParams.type === 'all' && ($rootScope.showList = $rootScope.temp_all);
			$routeParams.type === 'environment' && ($rootScope.showList = $rootScope.temp_environment);
			$routeParams.type === 'black' && ($rootScope.showList = $rootScope.temp_black);
			$routeParams.type === 'film' && ($rootScope.showList = $rootScope.temp_film);
			$routeParams.type === 'private' && ($rootScope.showList = $rootScope.temp_private);
		};
		$http.get("/json/people_picwall.json")
			.success(function (_data) {
				$rootScope.showPicWall = _data;
			});
		$rootScope.isActive = function(_index) {
			_.each($rootScope.state, function(element) {
				element = false;
			});
			$rootScope.state[_index] = true;
		};
	})
	.controller('picwall', function ($scope, $rootScope) {
		$rootScope.showPicWall = _.shuffle($rootScope.showPicWall);
	})
	.controller('list', function ($scope, $routeParams, $rootScope, $http) {
		if ($rootScope.temp_all.length === 0) {
			$http.get("/json/people_list.json")
				 .success(function (_data) {
					$rootScope.temp_all = _data.lists;
					_.each($rootScope.temp_all, function (element) {
						element.type === 'environment' && $rootScope.temp_environment.push(element);
						element.type === 'black' && $rootScope.temp_black.push(element);
						element.type === 'film' && $rootScope.temp_film.push(element);
						element.type === 'private' && $rootScope.temp_private.push(element);
					});
					$rootScope.listTypeConfirm();
				});
		} else
			$rootScope.listTypeConfirm();
	})
	.controller('album-nav', function ($scope) {

	});
