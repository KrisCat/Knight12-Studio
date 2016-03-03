/**
 * ------------------------------------------
 * 整个网站的路由配置
 * @version  1.0
 * @update   2015/12/28
 * @author   小木瓜(mrgaonju@gmail.com)
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

	// Angular-ui-router路由配置
	var routeMap = {
		// 一级路由
		'index': {
			url: '/',
			viewUrl: 'module/index/index.html',
			ctrlUrl: 'module/index/indexCtrl',
			ctrlName: 'indexCtrl'
		},
		'people': {
			url: '/people',
			viewUrl: 'module/people/people.html',
			ctrlUrl: 'module/people/peopleCtrl',
			ctrlName: 'peopleCtrl'
		},
		'private': {
			url: '/private',
			viewUrl: 'module/private/private.html',
			ctrlUrl: 'module/private/privateCtrl',
			ctrlName: 'privateCtrl'
		},
		'scenery': {
			url: '/scenery',
			viewUrl: 'module/scenery/scenery.html',
			ctrlUrl: 'module/scenery/sceneryCtrl',
			ctrlName: 'sceneryCtrl'
		},
		'love': {
			url: '/love',
			viewUrl: 'module/love/love.html',
			ctrlUrl: 'module/love/loveCtrl',
			ctrlName: 'loveCtrl'
		},
		'activity': {
			url: '/activity',
			viewUrl: 'module/activity/activity.html',
			ctrlUrl: 'module/activity/activityCtrl',
			ctrlName: 'activityCtrl'
		},
		'about': {
			url: '/about',
			viewUrl: 'module/about/about.html',
			ctrlUrl: 'module/about/aboutCtrl',
			ctrlName: 'aboutCtrl'
		},
		// 作品展示
		'album': {
			url: '/album/:id',
			viewUrl: 'module/album/album.html',
			ctrlUrl: 'module/album/albumCtrl',
			ctrlName: 'albumCtrl'
		},
		// 环境人像二级路由
		'people.status': {
			url: '/status',
			viewUrl: 'component/status/status.html',
			ctrlUrl: 'component/status/statusCtrl',
			ctrlName: 'statusCtrl'
		},
		'people.picwall': {
			url: '/picwall',
			viewUrl: 'component/picwall/picwall.html',
			ctrlUrl: 'component/picwall/picwallCtrl',
			ctrlName: 'picwallCtrl'
		},
		'people.list': {
			url: '/list/:type',
			viewUrl: 'component/list/list.html',
			ctrlUrl: 'component/list/listCtrl',
			ctrlName: 'listCtrl'
		},
		// 私房人像二级路由
		'private.status': {
			url: '/status',
			viewUrl: 'component/status/status.html',
			ctrlUrl: 'component/status/statusCtrl',
			ctrlName: 'statusCtrl'
		},
		'private.picwall': {
			url: '/picwall',
			viewUrl: 'component/picwall/picwall.html',
			ctrlUrl: 'component/picwall/picwallCtrl',
			ctrlName: 'picwallCtrl'
		},
		'private.list': {
			url: '/list/:type',
			viewUrl: 'component/list/list.html',
			ctrlUrl: 'component/list/listCtrl',
			ctrlName: 'listCtrl'
		},
		// 风光摄影二级路由
		'scenery.picwall': {
			url: '/picwall',
			viewUrl: 'component/picwall/picwall.html',
			ctrlUrl: 'component/picwall/picwallCtrl',
			ctrlName: 'picwallCtrl'
		},
		'scenery.list': {
			url: '/list/:type',
			viewUrl: 'component/list/list.html',
			ctrlUrl: 'component/list/listCtrl',
			ctrlName: 'listCtrl'
		},
		// 创意摄影二级路由
		'love.picwall': {
			url: '/picwall',
			viewUrl: 'component/picwall/picwall.html',
			ctrlUrl: 'component/picwall/picwallCtrl',
			ctrlName: 'picwallCtrl'
		},
		'love.list': {
			url: '/list/:type',
			viewUrl: 'component/list/list.html',
			ctrlUrl: 'component/list/listCtrl',
			ctrlName: 'listCtrl'
		}
	};
	// app控制器
	for (var key in routeMap) {
		app.controller(routeMap[key].ctrlName, require(routeMap[key].ctrlUrl));
	}
	app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
		for (var key in routeMap) {
			$stateProvider.state(key, {
				url: routeMap[key].url,
				templateUrl: routeMap[key].viewUrl,
				controller: routeMap[key].ctrlName
			});
		}
		$urlRouterProvider.otherwise('/');
		//		$locationProvider.html5Mode(true);
	});

	// 控制器配置
	//	app.controller('navCtrl', function ($scope) {
	//		// 导航栏控制器
	//	});
	// 导航栏状态判断
	app.run(function ($rootScope) {
		$rootScope.navState = [0, 0, 0, 0, 0, 0, 0];
		$rootScope.toTop = function() {
			$("html, body").animate({
				scrollTop: "0px"
			}, {
				duration: 0
					//				easing: "swing"
			});
		};
	});

	return app;
};

define(['angular'
	   ,'require'
	   ,'angular-route'
	   ,'module/index/indexCtrl'
	   ,'module/people/peopleCtrl'
	   ,'module/private/privateCtrl'
	   ,'module/scenery/sceneryCtrl'
	   ,'module/activity/activityCtrl'
	   ,'module/love/loveCtrl'
	   ,'module/about/aboutCtrl'
	   ,'module/album/albumCtrl'
	   ,'component/status/statusCtrl'
	   ,'component/picwall/picwallCtrl'
	   ,'component/list/listCtrl'
	   ,'component/intro/introCtrl'
], f);
