/**
 * ------------------------------------------
 * 整个网站的路由配置
 * @version  1.0
 * @update   2015/12/13
 * @author   cisheng(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function (angular, require) {

	var app = angular.module('webapp', ['ngRoute']);
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
	app.controller('album-nav', function ($scope) {

	});
	app.config(['$routeProvider', '$controllerProvider',
        function ($routeProvider, $controllerProvider) {

			var routeMap = {
				// 一级路由
				'/': { //路由
					path: 'module/index/index.js', //模块的代码路径
					controller: 'indexController' //控制器名称
				}
				//                '/people': {                           //路由
				//                    path: 'module/people/people.js',         //模块的代码路径
				//                    controller: 'peopleController'     //控制器名称
				//                },
				//                '/walker': {                           //路由
				//                    path: 'module/walker/walker.js',         //模块的代码路径
				//                    controller: 'walkerController'     //控制器名称
				//                },
				//                '/nature': {                           //路由
				//                    path: 'module/nature/nature.js',         //模块的代码路径
				//                    controller: 'natureController'     //控制器名称
				//                },
				//                '/love': {                           //路由
				//                    path: 'module/love/love.js',         //模块的代码路径
				//                    controller: 'loveController'     //控制器名称
				//                },
				//                '/about': {                           //路由
				//                    path: 'module/about/about.js',         //模块的代码路径
				//                    controller: 'aboutController'     //控制器名称
				//                },
				//				'/album': {                           //路由
				//                    path: 'module/album/album.js',         //模块的代码路径
				//                    controller: 'albumController'     //控制器名称
				//                }
				// 二级路由
			};
			var defaultRoute = '/'; //默认跳转到某个路由
			$routeProvider.otherwise({
				redirectTo: defaultRoute
			});

			for (var key in routeMap) {
				$routeProvider.when(key, {
					template: '',
					controller: routeMap[key].controller,
					resolve: {
						keyName: requireModule(routeMap[key].path, routeMap[key].controller)
					}
				});
			}

			function requireModule(path, controller) {
				debugger;
				return function ($route, $q) {
					debugger;
					var deferred = $q.defer();
					require([path], function (ret) {
						$controllerProvider.register(controller, ret.controller);
						$route.current.template = ret.tpl;
						deferred.resolve();
					});
					return deferred.promise;
				}
			}

        }]);

	return app;
};

define([
	'angular',
	'require',
    'angular-route'
], f);
