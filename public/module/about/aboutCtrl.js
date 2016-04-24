/**
 * ------------------------------------------
 * 关于我们（about）控制器
 * @version  1.0
 * @update   2016/01/04
 * @author   Kimi(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($rootScope) {
		$rootScope.toTop();
		$rootScope.navState = [0,0,0,0,0,0,1];
	}
};

define(['angular'], f);
