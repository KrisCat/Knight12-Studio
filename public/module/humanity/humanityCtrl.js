/**
 * ------------------------------------------
 * 人文摄影（humanity）控制器
 * @version  1.0
 * @update   2016/01/05
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $rootScope, $http) {
		$rootScope.navState = [0,0,0,1,0,0,0];
	}
};

define(['angular'], f)
