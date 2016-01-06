/**
 * ------------------------------------------
 * 印象系列（impression）控制器
 * @version  1.0
 * @update   2016/01/06
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $http, $rootScope) {
		$rootScope.navState = [0, 0, 0, 0, 1, 0, 0];
	}
};

define(['angular'], f)
