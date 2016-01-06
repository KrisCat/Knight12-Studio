/**
 * ------------------------------------------
 * 爱心公益（love）控制器
 * @version  1.0
 * @update   2015/01/06
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function (angular, tpl) {
	return function ($scope, $http, $rootScope) {
		$rootScope.navState = [0, 0, 0, 0, 0, 1, 0];
	}
};

define(['angular'], f)
