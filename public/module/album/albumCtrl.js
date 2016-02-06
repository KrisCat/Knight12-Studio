/**
 * ------------------------------------------
 * 单个相册页面（album）控制器
 * @version  1.0
 * @update   2015/12/29
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function (angular) {
	return function ($scope, $http, $rootScope, $location, $anchorScroll, $stateParams) {
		$rootScope.toTop();
		$rootScope.navState = [0, 1, 0, 0, 0, 0, 0];
		// 变量初始化
		$scope.album_content = {};
		// 页面锚点解决方案
		$scope.goto = function (_id) {
			// 将 location.hash 锁定到想要滚动到的元素id上
			$location.hash(_id);

			// call $anchorScroll()
			$anchorScroll();
		};
		// 侧边栏滚动悬浮
		$(function () {
			$(window).scroll(function () {
				var scrollY = $(document).scrollTop(); // 获取垂直滚动的距离，即滚动了多少
				if (scrollY > 300) { //如果滚动距离大于100px悬浮
					$('.nav-side').css({
						position: "fixed",
						top: "0px"
					});
				} else {
					$('.nav-side').css("position", "relative");
				}
			});
		});
		$http.get("/json/people_list.json")
			.success(function (_data) {
				_.each(_data, function (element) {
					element.id === $stateParams.id && ($scope.album_content = element);
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
	}
};

define([
	'angular'
], f)
