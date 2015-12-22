/**
 * ------------------------------------------
 * 图片墙（picwall）控制器
 * @version  1.0
 * @update   2015/12/14
 * @author   cisheng(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function (angular, tpl) {

	//angular会自动根据controller函数的参数名，导入相应的服务
	return {
		controller: function ($scope, $http, $interval, $q) {
			$scope.state = [1, 0, 0, 0, 0];
			$scope.showPicWall = _.shuffle($scope.showPicWall);
		},
		tpl: tpl
	};
};

define([
	'angular',
	'text!module/common/picwall.html'
], f)
