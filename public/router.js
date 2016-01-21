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

	// 路由配置
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
		'humanity': {
			url: '/humanity/:type',
			viewUrl: 'module/humanity/humanity.html',
			ctrlUrl: 'module/humanity/humanityCtrl',
			ctrlName: 'humanityCtrl'
		},
		'scenery': {
			url: '/scenery/:type',
			viewUrl: 'module/scenery/scenery.html',
			ctrlUrl: 'module/scenery/sceneryCtrl',
			ctrlName: 'sceneryCtrl'
		},
		'impression': {
			url: '/impression/:type',
			viewUrl: 'module/impression/impression.html',
			ctrlUrl: 'module/impression/impressionCtrl',
			ctrlName: 'impressionCtrl'
		},
		'love': {
			url: '/love/:type',
			viewUrl: 'module/love/love.html',
			ctrlUrl: 'module/love/loveCtrl',
			ctrlName: 'loveCtrl'
		},
		'about': {
			url: '/about',
			viewUrl: 'module/about/about.html',
			ctrlUrl: 'module/about/aboutCtrl',
			ctrlName: 'aboutCtrl'
		},
		// 二级路由
		'people.picwall': {
			url: '/picwall',
			viewUrl: 'module/people/ui/picwall.html',
			ctrlUrl: 'module/people/ui/picwallCtrl',
			ctrlName: 'picwallCtrl'
		},
		'people.list': {
			url: '/list/:type',
			viewUrl: 'module/people/ui/list.html',
			ctrlUrl: 'module/people/ui/listCtrl',
			ctrlName: 'listCtrl'
		},
		// 相册浏览
		'album': {
			url: '/album/:id',
			viewUrl: 'module/album/album.html',
			ctrlUrl: 'module/album/albumCtrl',
			ctrlName: 'albumCtrl'
		}
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
	for (var key in routeMap) {
		app.controller(routeMap[key].ctrlName, require(routeMap[key].ctrlUrl));
	}

	return app;
};

define(['angular'
	   , 'require'
	   , 'angular-route'
	   , 'module/index/indexCtrl'
	   , 'module/people/peopleCtrl'
	   , 'module/humanity/humanityCtrl'
	   , 'module/scenery/sceneryCtrl'
	   , 'module/impression/impressionCtrl'
	   , 'module/love/loveCtrl'
	   , 'module/about/aboutCtrl'
	   , 'module/people/ui/picwallCtrl'
	   , 'module/people/ui/listCtrl'
	   , 'module/album/albumCtrl'
], f);
