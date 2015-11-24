angular.module('people', ['ngRoute']).controller('people', function ($scope, $http) {
		//	$http.get("http://218.244.148.188/json/albumList.json")
		//		 .success(function (_data) {
		//			var j = 0;
		//		    for (var i = 0; i < 4; i++) {
		//				j = i + 4;
		//				$scope.albumList1[i] = _data[i];
		//				$scope.albumList2[i] = _data[j];
		//			}
		//		});

	})
	// 路由配置
	.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/common/picwall.html',
				controller: 'picwall',
			})
			.when('/picwall', {
				templateUrl: 'views/common/picwall.html',
				controller: 'picwall',
			})
			.when('/list/:type', {
				templateUrl: 'views/common/list.html',
				controller: 'list',
			})
			.otherwise({
				redirectTo: '/'
			});
	}])
	.controller('picwall', function ($scope) {
		$scope.showPicWall = {
			photos: [
				{
					src: 'img/love/photos/1.jpg'
				},
				{
					src: 'img/love/photos/2.jpg'
				},
				{
					src: 'img/love/photos/3.jpg'
				},
				{
					src: 'img/love/photos/4.jpg'
				},
				{
					src: 'img/love/photos/5.jpg'
				},
				{
					src: 'img/love/photos/6.jpg'
				},
				{
					src: 'img/love/photos/7.jpg'
				},
				{
					src: 'img/love/photos/8.jpg'
				},
				{
					src: 'img/love/photos/9.jpg'
				},
				{
					src: 'img/love/photos/10.jpg'
				},
				{
					src: 'img/love/photos/11.jpg'
				},
				{
					src: 'img/love/photos/12.jpg'
				},
				{
					src: 'img/love/photos/13.jpg'
				},
				{
					src: 'img/love/photos/14.jpg'
				},
				{
					src: 'img/love/photos/15.jpg'
				},
				{
					src: 'img/love/photos/16.jpg'
				},
				{
					src: 'img/love/photos/17.jpg'
				},
				{
					src: 'img/love/photos/1.jpg'
				},
				{
					src: 'img/love/photos/2.jpg'
				},
				{
					src: 'img/love/photos/3.jpg'
				},
				{
					src: 'img/love/photos/4.jpg'
				},
				{
					src: 'img/love/photos/5.jpg'
				},
				{
					src: 'img/love/photos/6.jpg'
				},
				{
					src: 'img/love/photos/7.jpg'
				},
				{
					src: 'img/love/photos/8.jpg'
				},
				{
					src: 'img/love/photos/9.jpg'
				},
				{
					src: 'img/love/photos/10.jpg'
				},
				{
					src: 'img/love/photos/11.jpg'
				},
				{
					src: 'img/love/photos/12.jpg'
				},
				{
					src: 'img/love/photos/13.jpg'
				},
				{
					src: 'img/love/photos/11.jpg'
				},
				{
					src: 'img/love/photos/12.jpg'
				},
				{
					src: 'img/love/photos/13.jpg'
				},
				{
					src: 'img/love/photos/14.jpg'
				},
				{
					src: 'img/love/photos/15.jpg'
				},
				{
					src: 'img/love/photos/16.jpg'
				},
				{
					src: 'img/love/photos/17.jpg'
				},
				{
					src: 'img/love/photos/1.jpg'
				},
				{
					src: 'img/love/photos/2.jpg'
				},
				{
					src: 'img/love/photos/3.jpg'
				}
		]
		};
		$scope.showPicWall.photos = _.shuffle($scope.showPicWall.photos);
	})
	.controller('list', function ($scope, $routeParams) {
//		console.log($routeParams.type);

		$scope.temp_all = {
			name: '人像写真',
			lists: [{
				id: 001,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exdpcutw29j31jm2bc7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 002,
				cover: 'http://ww1.sinaimg.cn/thumb150/0062ZzD9gw1exs9sder84j31jm2bckjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 003,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exnkbrvxodj31jm2bc7wk.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 004,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1ex8l94a60wj32bc1jm7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 005,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ex7x2jwwphj32bc1jme82.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 006,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ewzpq4z6w3j32bc1jmu0y.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 007,
				cover: 'http://ww4.sinaimg.cn/thumb150/0062ZzD9jw1ewayxa94ypj31jl2bchdt.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 008,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1evu30gznwjj3226334qv8.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 009,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1evksv5r3lmj3226334u0z.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 010,
				cover: 'http://ww4.sinaimg.cn/thumb150/0062ZzD9jw1ev7nrnedpoj32bc1jmkjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 001,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exdpcutw29j31jm2bc7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 002,
				cover: 'http://ww1.sinaimg.cn/thumb150/0062ZzD9gw1exs9sder84j31jm2bckjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 003,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exnkbrvxodj31jm2bc7wk.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 004,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1ex8l94a60wj32bc1jm7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 005,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ex7x2jwwphj32bc1jme82.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}]
		};
		$scope.temp_environment = {
			name: '人像写真',
			lists: [{
				id: 001,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exdpcutw29j31jm2bc7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 002,
				cover: 'http://ww1.sinaimg.cn/thumb150/0062ZzD9gw1exs9sder84j31jm2bckjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 003,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exnkbrvxodj31jm2bc7wk.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 004,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1ex8l94a60wj32bc1jm7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 005,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ex7x2jwwphj32bc1jme82.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 006,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ewzpq4z6w3j32bc1jmu0y.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}]
		};
		$scope.temp_black = {
			name: '人像写真',
			lists: [{
				id: 004,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1ex8l94a60wj32bc1jm7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 005,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ex7x2jwwphj32bc1jme82.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 006,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ewzpq4z6w3j32bc1jmu0y.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 007,
				cover: 'http://ww4.sinaimg.cn/thumb150/0062ZzD9jw1ewayxa94ypj31jl2bchdt.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 008,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1evu30gznwjj3226334qv8.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 009,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1evksv5r3lmj3226334u0z.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 010,
				cover: 'http://ww4.sinaimg.cn/thumb150/0062ZzD9jw1ev7nrnedpoj32bc1jmkjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 001,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exdpcutw29j31jm2bc7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 002,
				cover: 'http://ww1.sinaimg.cn/thumb150/0062ZzD9gw1exs9sder84j31jm2bckjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 003,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exnkbrvxodj31jm2bc7wk.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 004,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1ex8l94a60wj32bc1jm7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 005,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ex7x2jwwphj32bc1jme82.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}]
		};
		$scope.temp_film = {
			name: '人像写真',
			lists: [{
				id: 002,
				cover: 'http://ww1.sinaimg.cn/thumb150/0062ZzD9gw1exs9sder84j31jm2bckjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 003,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exnkbrvxodj31jm2bc7wk.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 004,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1ex8l94a60wj32bc1jm7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 005,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ex7x2jwwphj32bc1jme82.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 006,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ewzpq4z6w3j32bc1jmu0y.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 007,
				cover: 'http://ww4.sinaimg.cn/thumb150/0062ZzD9jw1ewayxa94ypj31jl2bchdt.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 008,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1evu30gznwjj3226334qv8.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 009,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1evksv5r3lmj3226334u0z.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 010,
				cover: 'http://ww4.sinaimg.cn/thumb150/0062ZzD9jw1ev7nrnedpoj32bc1jmkjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 001,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exdpcutw29j31jm2bc7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 002,
				cover: 'http://ww1.sinaimg.cn/thumb150/0062ZzD9gw1exs9sder84j31jm2bckjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 003,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exnkbrvxodj31jm2bc7wk.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 004,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1ex8l94a60wj32bc1jm7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 005,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ex7x2jwwphj32bc1jme82.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}]
		};
		$scope.temp_private = {
			name: '人像写真',
			lists: [{
				id: 003,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exnkbrvxodj31jm2bc7wk.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 004,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1ex8l94a60wj32bc1jm7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 005,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ex7x2jwwphj32bc1jme82.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 006,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ewzpq4z6w3j32bc1jmu0y.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 007,
				cover: 'http://ww4.sinaimg.cn/thumb150/0062ZzD9jw1ewayxa94ypj31jl2bchdt.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 008,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1evu30gznwjj3226334qv8.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 009,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1evksv5r3lmj3226334u0z.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 010,
				cover: 'http://ww4.sinaimg.cn/thumb150/0062ZzD9jw1ev7nrnedpoj32bc1jmkjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 001,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exdpcutw29j31jm2bc7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 002,
				cover: 'http://ww1.sinaimg.cn/thumb150/0062ZzD9gw1exs9sder84j31jm2bckjo.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 003,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1exnkbrvxodj31jm2bc7wk.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 004,
				cover: 'http://ww3.sinaimg.cn/thumb150/0062ZzD9jw1ex8l94a60wj32bc1jm7wj.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}, {
				id: 005,
				cover: 'http://ww2.sinaimg.cn/thumb150/0062ZzD9jw1ex7x2jwwphj32bc1jme82.jpg',
				count: '12张',
				title: '南方姑娘',
				date: '2014年11月8日'
		}]
		};
		($routeParams.type == undefined) && $scope.showList = $scope.temp_all;
		($routeParams.type === 'all') && $scope.showList = $scope.temp_all;
		($routeParams.type === 'environment') && $scope.showList = $scope.temp_environment;
		($routeParams.type === 'black') && $scope.showList = $scope.temp_black;
		($routeParams.type === 'film') && $scope.showList = $scope.temp_film;
		($routeParams.type === 'private') && $scope.showList = $scope.temp_private;
//		if ($routeParams.type == undefined) $scope.showList = $scope.temp_all;
//		if ($routeParams.type === 'all') $scope.showList = $scope.temp_all;
//		if ($routeParams.type === 'environment') $scope.showList = $scope.temp_environment;
//		if ($routeParams.type === 'black') $scope.showList = $scope.temp_black;
//		if ($routeParams.type === 'film') $scope.showList = $scope.temp_film;
//		if ($routeParams.type === 'private') $scope.showList = $scope.temp_private;
//	})
	.controller('album-nav', function ($scope) {

	});
