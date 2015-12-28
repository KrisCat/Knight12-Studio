/**
 * ------------------------------------------
 * 相册专辑分类（list）控制器
 * @version  1.0
 * @update   2015/12/14
 * @author   cisheng(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function (angular) {

	//angular会自动根据controller函数的参数名，导入相应的服务
	return function ($scope, $http, $interval, $q, $stateParams) {
			console.log($stateParams);  //获得路由中的参数
			$scope.isActive();
			if ($scope._all.length === 0) {
				$http.get("/json/people_list.json")
					.success(function (_data) {
						$scope._all = _data.lists;
						_.each($scope._all, function (element) {
							element.type === 'environment' && $scope._environment.push(element);
							element.type === 'black' && $scope._black.push(element);
							element.type === 'film' && $scope._film.push(element);
							element.type === 'private' && $scope._private.push(element);
						});
						$scope.listTypeConfirm();
					});
			} else
				$scope.listTypeConfirm();
		}
};

define([
	'angular',
], f)
