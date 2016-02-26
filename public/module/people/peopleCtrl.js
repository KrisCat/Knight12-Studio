/**
 * ------------------------------------------
 * 人像摄影（people）父控制器
 * @version  1.0
 * @update   2015/12/14
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $http, $rootScope, $stateParams) {
			$rootScope.toTop();
			$rootScope.navState = [0, 1, 0, 0, 0, 0, 0];
			$scope.state = [1, 0, 0, 0, 0, 0];
			$scope.activeTypeConfirm = function (_index) {
				$scope.state = _.map($scope.state, function () {
					return 0;
				});
				$scope.state[_index] = 1;
			};
			$scope.isActive = function () {
				$stateParams.type === 'all' && $scope.activeTypeConfirm(1);
				$stateParams.type === 'environment' && $scope.activeTypeConfirm(2);
				$stateParams.type === 'black' && $scope.activeTypeConfirm(3);
				$stateParams.type === 'film' && $scope.activeTypeConfirm(4);
				$stateParams.type === 'other' && $scope.activeTypeConfirm(5);
			};
		}
};

define(['angular'], f);
