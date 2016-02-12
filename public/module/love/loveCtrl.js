/**
 * ------------------------------------------
 * 爱心公益（love）控制器
 * @version  1.0
 * @update   2016/02/10
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $rootScope, $http, $stateParams, $sce) {
		$rootScope.toTop();
		$rootScope.navState = [0, 0, 0, 0, 1, 0, 0];
		var _map = {
			'fanbu': [1, 0],
			'wrap': [0, 1],
		};
		//mock
		$scope.state = _map[$stateParams.type];
		var _url = "/json/love_" + $stateParams.type + '.json'
		$http.get(_url)
			.success(function (_data) {
				$scope.data = _data;
				$scope.data.description = $sce.trustAsHtml(_data.description);
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

define(['angular'], f)

