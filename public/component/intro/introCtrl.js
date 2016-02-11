/**
 * ------------------------------------------
 * 介绍页面（intro）控制器
 * @version  1.0
 * @update   2016/02/10
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $http, $location) {
		$scope.activeTypeConfirm(1);
	}
};

define(['angular'], f)
