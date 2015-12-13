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
		$rootScope._all = [];
		$rootScope._environment = [];
		$rootScope._black = [];
		$rootScope._film = [];
		$rootScope._private = [];
		$rootScope.state = [0,0,0,0,0];
		$rootScope.listTypeConfirm = function () {
			$routeParams.type === 'all' && ($rootScope.showList = $rootScope._all);
			$routeParams.type === 'environment' && ($rootScope.showList = $rootScope._environment);
			$routeParams.type === 'black' && ($rootScope.showList = $rootScope._black);
			$routeParams.type === 'film' && ($rootScope.showList = $rootScope._film);
			$routeParams.type === 'private' && ($rootScope.showList = $rootScope._private);
		};
		$http.get("/json/people_picwall.json")
			.success(function (_data) {
				$rootScope.showPicWall = _data;
			});
		$rootScope.activeTypeConfirm = function(_index) {
			$rootScope.state = _.map($rootScope.state, function() {
				return 0;
			});
			$rootScope.state[_index] = 1;
		};
		$rootScope.isActive = function () {
			$routeParams.type === 'all' && $rootScope.activeTypeConfirm(1);
			$routeParams.type === 'environment' && $rootScope.activeTypeConfirm(2);
			$routeParams.type === 'black' && $rootScope.activeTypeConfirm(3);
			$routeParams.type === 'film' && $rootScope.activeTypeConfirm(4);
			$routeParams.type === 'private' && $rootScope.activeTypeConfirm(5);
		};

	})
	.controller('picwall', function ($scope, $rootScope) {
		$rootScope.state = [1,0,0,0,0];
		$rootScope.showPicWall = _.shuffle($rootScope.showPicWall);
	})
	.controller('list', function ($scope, $rootScope, $http) {
		$rootScope.isActive();
		if ($rootScope._all.length === 0) {
			$http.get("/json/people_list.json")
				 .success(function (_data) {
					$rootScope._all = _data.lists;
					_.each($rootScope._all, function (element) {
						element.type === 'environment' && $rootScope._environment.push(element);
						element.type === 'black' && $rootScope._black.push(element);
						element.type === 'film' && $rootScope._film.push(element);
						element.type === 'private' && $rootScope._private.push(element);
					});
					$rootScope.listTypeConfirm();
				});
		} else
			$rootScope.listTypeConfirm();
	})
	.controller('album-nav', function ($scope) {

	});
