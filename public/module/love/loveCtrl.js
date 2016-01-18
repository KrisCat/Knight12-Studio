/**
 * ------------------------------------------
 * 爱心公益（love）控制器
 * @version  1.0
 * @update   2015/01/06
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $rootScope, $http, $stateParams, $sce) {
		$rootScope.toTop();
		$rootScope.navState = [0, 0, 0, 0, 0, 1, 0];
		var _map = {'nanking':     [1, 0, 0]
			       ,'hangzhou':    [0, 1, 0]
			       ,'honglou':     [0, 0, 1]
		           };
		var _url = "/json/humanity_" + $stateParams.type + '.json'
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

