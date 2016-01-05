angular.module('sampleApp', ['ngRoute', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'GeekCtrl', 'GeekService']).controller('DepController', function ($scope) {

//	$scope.tagline = 'Nothing beats a pocket protector!';
	$scope.cur1 = true;
	$scope.cur2 = false;
	$scope.depSelect1 = function() {
		$scope.cur1 = true;
		$scope.cur2 = false;
	}
	$scope.depSelect2 = function() {
		$scope.cur2 = true;
		$scope.cur1 = false;
	}

});
