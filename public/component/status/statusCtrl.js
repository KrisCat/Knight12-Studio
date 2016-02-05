/**
 * ------------------------------------------
 * 图片墙（status）控制器
 * @version  1.0
 * @update   2015/12/18
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function (angular) {

	//angular会自动根据controller函数的参数名，导入相应的服务
	return function ($scope, $http, $interval, $q) {
		$scope.activeTypeConfirm(0);
		$http.get("/json/people_status.json")
			.success(function (_data) {
				$scope.showstatus = _data;
				$scope.showstatus = _.shuffle($scope.showstatus);
			});
	}
};

define([
	'angular',
//	'./peopleCtrl'
], f)
