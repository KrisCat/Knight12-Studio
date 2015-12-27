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

	// 路由配置
	var routeMap = {
		'index': {
			url: '/',
			viewUrl: 'module/index/index.html',
			ctrlUrl: 'module/index/indexCtrl', //模块的代码路径
			ctrlName: 'indexCtrl' //控制器名称
		},
		'people': {
			url: '/people',
			viewUrl: 'module/people/people.html',
			ctrlUrl: 'module/people/peopleCtrl', //模块的代码路径
			ctrlName: 'peopleCtrl' //控制器名称
		},
		'walker': {
			url: '/walker',
			viewUrl: 'module/walker/walker.html',
			ctrlUrl: 'module/walker/walkerCtrl', //模块的代码路径
			ctrlName: 'walkerCtrl' //控制器名称
		},
		'nature': {
			url: '/nature',
			viewUrl: 'module/nature/nature.html',
			ctrlUrl: 'module/nature/natureCtrl', //模块的代码路径
			ctrlName: 'natureCtrl' //控制器名称
		},
		'impression': {
			url: '/impression',
			viewUrl: 'module/impression/impression.html',
			ctrlUrl: 'module/impression/impressionCtrl', //模块的代码路径
			ctrlName: 'impressionCtrl' //控制器名称
		},
		'love': {
			url: '/love',
			viewUrl: 'module/love/love.html',
			ctrlUrl: 'module/love/loveCtrl', //模块的代码路径
			ctrlName: 'loveCtrl' //控制器名称
		},
		'about': {
			url: '/about',
			viewUrl: 'module/about/about.html',
			ctrlUrl: 'module/about/aboutCtrl', //模块的代码路径
			ctrlName: 'aboutCtrl' //控制器名称
		},
		// 二级路由

	};
	app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		for (var key in routeMap) {
			$stateProvider.state(key, {
				url: routeMap[key].url,
				templateUrl: routeMap[key].viewUrl,
				controller: routeMap[key].ctrlName
			});
		}
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	});

	// 控制器配置
	app.controller('navCtrl', function ($scope) {
		// 导航栏控制器
	});
	for (var key in routeMap) {
		app.controller(routeMap[key].ctrlName, ['$scope', '$http', '$stateParams', '$interval', '$q', require(routeMap[key].ctrlUrl)]);
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
