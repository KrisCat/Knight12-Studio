/**
 * ------------------------------------------
 * 图片墙（status）控制器
 * @version  1.0
 * @update   2015/12/18
 * @author   Kimi(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $http, $location) {
		$scope.activeTypeConfirm(0);
		function whichType(type) {
			if ($location.absUrl().indexOf(type) === -1) return;
			else {
				var _jsonUrl = "/json/" + type + "_status.json"
				$http.get(_jsonUrl)
					.success(function (_data) {
						$scope.showstatus = _data;
						$scope.showstatus = _.shuffle($scope.showstatus);
					});
			}
		}
		whichType('people');
		whichType('private');
		whichType('love');
	}
};

define(['angular'], f)
