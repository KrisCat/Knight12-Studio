/**
 * ------------------------------------------
 * 图片墙（picwall）控制器
 * @version  1.0
 * @update   2015/12/18
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function (angular) {

	//angular会自动根据controller函数的参数名，导入相应的服务
	return function ($scope, $http, $interval, $q) {
		$http.get("/json/people_picwall.json")
			.success(function (_data) {
				$scope.showpicwall = _data;
				$scope.state = [1, 0, 0, 0, 0];
				$scope.showpicwall = _.shuffle($scope.showpicwall);
			});
	}
};

define([
	'angular',
//	'./peopleCtrl'
], f)
