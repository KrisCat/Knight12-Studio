/**
 * ------------------------------------------
 * 印象系列（impression）控制器
 * @version  1.0
 * @update   2016/01/06
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $rootScope, $http, $stateParams, $sce) {
		$rootScope.toTop();
		$rootScope.navState = [0, 0, 0, 0, 1, 0, 0];
		var _map = {
			'west': [1, 0, 0, 0, 0, 0],
			'monet': [0, 1, 0, 0, 0, 0],
			'vangogh': [0, 0, 1, 0, 0, 0],
			'renoir': [0, 0, 0, 1, 0, 0],
			'works': [0, 0, 0, 0, 1, 0]
				//			       ,'water':    [0, 0, 0, 0, 0, 1]
		};
		var _url = "/json/scenery_" + $stateParams.type + '.json'
		$scope.state = _map[$stateParams.type];
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
