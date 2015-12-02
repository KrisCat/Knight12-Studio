angular.module('album', ['ngRoute'])
	// 自定义指令
	.directive('onFinishRenderFilters', function ($timeout) {
		return {
			restrict: 'A',
			// 链接函数将作用域和dom进行链接
			link: function(scope,element,attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    //根据controller的关系是选择$emit或者$broadcast
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
		};
	})
	// 启动前路由配置
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/:id', {
				templateUrl: 'views/common/album_content.html',
				controller: 'album_content',
			})
			.otherwise({
				redirectTo: '/1001'
			});
	}])
	.run(function ($rootScope, $routeParams, $location, $anchorScroll) {
		// 变量初始化
		$rootScope.album_content = {};

		// 页面锚点解决方案
		$rootScope.goto = function (_id) {
			// 将 location.hash 锁定到想要滚动到的元素id上
			$location.hash(_id);

			// call $anchorScroll()
			$anchorScroll();
		};
		// 单个相册侧边栏滚动悬浮
		$(function () {
			$('.nav-side').stickUp({
				// topMargin : '55px'
				parts: {
					0: 'intro',
					1: 'imgFirst',
					2: 'imgFirst',
					3: 'footer'
				},
				itemHover: ''
			});
		});
	})
	.controller('album_content', function ($rootScope, $scope, $http, $routeParams) {
		$http.get("/json/album_content.json")
			.success(function (_data) {
				_.each(_data, function (element) {
					element.id === $routeParams.id && ($rootScope.album_content = element);
				});
			});
		$scope.$on('ngRepeatFinished', function () {
			// 下面是在dom render完成后执行的js
			// 幻灯片浏览
			$(function () {
				$(".boxer").boxer({
					mobile: true
				});
			});
		});
	})

.controller('album-nav', function ($scope) {

});
