/**
 * ------------------------------------------
 * 关于我们（about）控制器
 * @version  1.0
 * @update   2016/01/04
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $rootScope, $http, $sce) {
		$rootScope.navState = [0,0,0,0,0,0,1];
		$http.get("/json/about_choice.json")
			.success(function (_data) {
				// angular取消对 HTML 片段的转义
				$scope.items = _.map(_data, function(e) {
					e.bg_intro = $sce.trustAsHtml(e.bg_intro);
					return e;
				})
			});
	}
};

define(['angular'], f)
