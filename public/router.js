/**
 * ------------------------------------------
 * 整个网站的路由配置
 * @version  1.0
 * @update   2015/12/23
 * @author   xiaomugua(mrgaonju@gmail.com)
 * ------------------------------------------
 */
var f = function (angular, require) {

	var app = angular.module('webapp', ['ui.router']);
	// 自定义指令
	app.directive('onFinishRenderFilters', function ($timeout) {
		return {
			restrict: 'A',
			// 链接函数将作用域和dom进行链接
			link: function (scope, element, attr) {
				if (scope.$last === true) {
					$timeout(function () {
						//根据controller的关系是选择$emit或者$broadcast
						scope.$emit('ngRepeatFinished');
					});
				}
			}
		};
	});
	app.controller('navController', function ($scope) {

	});
	var routeMap = {
		'index': {
			url: '/',
			viewUrl: 'module/index/index.html',
			ctrlUrl: 'module/index/indexCtrl', //模块的代码路径
			ctrlName: 'indexController' //控制器名称
		},
		'people': {
			url: '/people',
			viewUrl: 'module/index/people.html',
			ctrlUrl: 'module/people/peopleCtrl', //模块的代码路径
			ctrlName: 'peopleController' //控制器名称
		},
		'walker': {
			url: '/walker',
			viewUrl: 'module/index/walker.html',
			ctrlUrl: 'module/walker/walkerCtrl', //模块的代码路径
			ctrlName: 'walkerController' //控制器名称
		},
		'nature': {
			url: '/nature',
			viewUrl: 'module/index/nature.html',
			ctrlUrl: 'module/nature/natureCtrl', //模块的代码路径
			ctrlName: 'natureController' //控制器名称
		},
		'impression': {
			url: '/impression',
			viewUrl: 'module/index/impression.html',
			ctrlUrl: 'module/impression/impressionCtrl', //模块的代码路径
			ctrlName: 'impressionController' //控制器名称
		},
		'love': {
			url: '/love',
			viewUrl: 'module/index/love.html',
			ctrlUrl: 'module/love/loveCtrl', //模块的代码路径
			ctrlName: 'loveController' //控制器名称
		},
		'about': {
			url: '/about',
			viewUrl: 'module/index/about.html',
			ctrlUrl: 'module/about/aboutCtrl', //模块的代码路径
			ctrlName: 'aboutController' //控制器名称
		}
	};
	app.config(function ($stateProvider, $urlRouterProvider,$locationProvider) {
			//			var defaultRoute = '/'; //默认跳转到某个路由
			//
			//			$routeProvider.otherwise({
			//				redirectTo: defaultRoute
			//			});

						$locationProvider.html5Mode(true);
//			$stateProvider
//				.state('index', {
//					url: '/',
//					templateUrl: 'module/index/index.html',
//					controller: 'indexController'
//				})
//				.state('people', {
//					url: '/people',
//					templateUrl: 'module/people/people.html',
//					controller: 'peopleController'
//				});
			for (var key in routeMap) {
				$stateProvider.state(key, {
					url: routeMap[key].url,
					templateUrl: routeMap[key].viewUrl,
					controller: routeMap[key].ctrlName
				});
			}
			 $urlRouterProvider.otherwise('/');

			//			function requireModule(path, controller) {
			//				return function ($state, $q) {
			//					var deferred = $q.defer();
			//					require([path], function (ret) {
			//						$controllerProvider.register(controller, ret.controller);
			//						//						$route.current.template = ret.tpl;
			//						deferred.resolve();
			//					});
			//					return deferred.promise;
			//				}
			//			}

	});
	for (var key in routeMap) {
		app.controller(routeMap[key].ctrlName, ['$scope','$http', '$stateParams', '$interval', '$q',  require(routeMap[key].ctrlUrl)]);
	}
	return app;
};

define([
		'angular',
		'require',
		'angular-route',
		'module/index/indexCtrl',
		'module/people/peopleCtrl',
		'module/walker/walkerCtrl',
		'module/nature/natureCtrl',
		'module/impression/impressionCtrl',
		'module/love/loveCtrl',
		'module/about/aboutCtrl'
], f);
