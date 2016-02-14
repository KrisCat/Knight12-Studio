/**
 * ------------------------------------------
 * 拍摄活动（activity）控制器
 * @version  1.0
 * @update   2016/02/09
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $rootScope, $http, $sce) {
		$rootScope.toTop();
		$rootScope.navState = [0, 0, 0, 0, 0, 1, 0];
		//var _map = {
		//	'guest': [1, 0],
		//	'model': [0, 1]
		//};
		//mock
		//$scope.state = _map[$stateParams.type];
		//var _url = "/json/activity_" + $stateParams.type + '.json';
		var _url = "/json/activity_list.json";
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

define(['angular'], f);

