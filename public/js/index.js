angular.module('index', [])
	// 自定义指令
	.directive('onFinishRenderFilters', function ($timeout) {
		return {
			restrict: 'A',
			// 链接函数将作用域和dom进行链接
			link: function(scope,element,attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    //根据controller的关系是选择$emit或者$broadcast
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
		};
	})
	.controller('indexController', function ($scope, $http) {

	/**
	 * 轮播图切换
	 * @note  每隔30s切换一次，无限循环
	 * @return {Void}
	 */


	$scope.allLists = [];
	$scope.people = {
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
		}]
	};
	$scope.film = {
		name: '胶片味道',
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
		}]
	};
	$scope.city = {
		name: '城市印象',
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
		}]
	};
	$scope.allLists.push($scope.people, $scope.film, $scope.city);
	$http.get("/json/album_category.json")
		.success(function (_data) {
			$scope.classItems = _data;
		});
	$scope.$on('ngRepeatFinished', function () {
			// 下面是在dom render完成后执行的js
			// 所有相册分类类目展示切换
			$('.album-category li').click(function() {
				console.log('ok');
			})
			var _li_this = '';
			$('.album-category li').hover(
				function () {
					_li_this = ($(this).index());
					$(this).addClass('active');
					$('#j-category-view').show();
					$('#j-category-view li').eq(_li_this).show();
				},
				function () {
					$(this).removeClass('active');
					$('#j-category-view').hide();
					$('#j-category-view li').eq(_li_this).hide();
					$('#j-category-view').hover(
						function() {
							$('.album-category li').eq(_li_this).addClass('active');
							$(this).show();
							$('#j-category-view li').eq(_li_this).show()
						},
						function() {
							$(this).hide();
							$('#j-category-view li').eq(_li_this).hide();
							$('.album-category li.active').removeClass('active');
						}
					)
			});
		});

}).controller('album-nav', function ($scope) {

});
