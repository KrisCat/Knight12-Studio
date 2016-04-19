/**
 * ------------------------------------------
 * 爱心公益（love）控制器
 * @version  1.0
 * @update   2016/02/10
 * @author   Kimi(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $http, $rootScope, $stateParams) {
		$rootScope.toTop();
		$rootScope.navState = [0, 0, 0, 0, 1, 0, 0];
		$scope.state = [1, 0, 0, 0, 0];
		$scope.activeTypeConfirm = function (_index) {
			$scope.state = _.map($scope.state, function () {
				return 0;
			});
			$scope.state[_index] = 1;
		};
		$scope.isActive = function () {
			$stateParams.type === 'all' && $scope.activeTypeConfirm(1);
			$stateParams.type === 'creative' && $scope.activeTypeConfirm(2);
			$stateParams.type === 'people' && $scope.activeTypeConfirm(3);
			$stateParams.type === 'scenery' && $scope.activeTypeConfirm(4);
		};
	}
};

define(['angular'], f);


