angular.module('index', []).controller('indexController', function ($scope, $http) {
	$scope.albumList1 = [];
	$scope.albumList2 = [];
	$http.get("http://218.244.148.188/json/albumList.json")
		 .success(function (_data) {
			var j = 0;
		    for (var i = 0; i < 4; i++) {
				j = i + 4;
				$scope.albumList1[i] = _data[i];
				$scope.albumList2[i] = _data[j];
			}
		});
});
