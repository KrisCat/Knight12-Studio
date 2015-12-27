/**
 * ------------------------------------------
 * 人像摄影（people）父控制器
 * @version  1.0
 * @update   2015/12/14
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function (angular) {

	//angular会自动根据controller函数的参数名，导入相应的服务
	return function ($scope, $http, $interval, $q) {
//			console.log();  //获得路由中的参数
//			$scope.showPicWall = {};
//			$scope.showList = [];
//			$scope._all = [];
//			$scope._environment = [];
//			$scope._black = [];
//			$scope._film = [];
//			$scope._private = [];
//			$scope.state = [0, 0, 0, 0, 0];
//			$scope.listTypeConfirm = function () {
//				$routeParams.type === 'all' && ($scope.showList = $scope._all);
//				$routeParams.type === 'environment' && ($scope.showList = $scope._environment);
//				$routeParams.type === 'black' && ($scope.showList = $scope._black);
//				$routeParams.type === 'film' && ($scope.showList = $scope._film);
//				$routeParams.type === 'private' && ($scope.showList = $scope._private);
//			};
//			$http.get("/json/people_picwall.json")
//				.success(function (_data) {
//					$scope.showPicWall = _data;
//				});
//			$scope.activeTypeConfirm = function (_index) {
//				$scope.state = _.map($scope.state, function () {
//					return 0;
//				});
//				$scope.state[_index] = 1;
//			};
//			$scope.isActive = function () {
//				$routeParams.type === 'all' && $scope.activeTypeConfirm(1);
//				$routeParams.type === 'environment' && $scope.activeTypeConfirm(2);
//				$routeParams.type === 'black' && $scope.activeTypeConfirm(3);
//				$routeParams.type === 'film' && $scope.activeTypeConfirm(4);
//				$routeParams.type === 'private' && $scope.activeTypeConfirm(5);
//			};
		}
};

define([
	'angular'
], f)
