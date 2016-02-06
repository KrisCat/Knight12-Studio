/**
 * ------------------------------------------
 * 首页（index）控制器
 * @version  1.0
 * @update   2015/12/13
 * @author   cisheng(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	//angular会自动根据controller函数的参数名，导入相应的服务
	return function ($scope, $rootScope, $http, $stateParams, $interval, $q) {
			$rootScope.toTop();
			$rootScope.navState = [1, 0, 0, 0, 0, 0, 0];

			/**
			 * 轮播图切换
			 * 每隔4s切换一次，无限循环
			 * hover触发切换事件
			 */
//			$(function () {
//			Slider($('#banner_tabs'), {time: 5000
//				                      ,delay: 400
//				                      ,event: 'hover'
//				                      ,auto: true
//				                      ,mode: 'fade'
//				                      ,controller: $('#bannerCtrl')
//				                      ,activeControllerCls: 'active'
//									  }
//				  );
//				$('#banner_tabs .flex-prev').click(function () {
//					bannerSlider.prev();
//				});
//				$('#banner_tabs .flex-next').click(function () {
//					bannerSlider.next();
//				});
//			});
			$q.all({req1: $http.get("/json/people_list_tmp.json")
				   ,req2: $http.get("/json/scenery_list_tmp.json")
				   ,req3: $http.get("/json/humanity_list.json")
				   ,req4: $http.get("/json/impression_list.json")
			}).then(function (arr) {
				// 以上请求都完成后执行以下代码
				_.each(arr, function (e) {
					e.data.name === '人像摄影' && ($scope.people = e.data);
					e.data.name === '风光摄影' && ($scope.scenery = e.data);
					e.data.name === '人文摄影' && ($scope.humanity = e.data);
					e.data.name === '印象系列' && ($scope.impression = e.data);
				});
				/**
				 * 大屏排列12个，小屏排列10个
				 * @threshold  阈值
				 * @return 选取后的新数组
				 */
				function select(arr, threshold) {
					arr.lists = _(arr.lists).chain()
						.map(function (e, i) {
							if (i < threshold) return e;
						})
						.compact()
						.value();
				}
				select($scope.people, 12);
				select($scope.scenery, 12);
				select($scope.humanity, 12);
				select($scope.impression, 12);
				//			if ($(window).width() >= 1400) {
				//				select($scope.people, 12);
				//				select($scope.scenery, 12);
				//				select($scope.humanity, 12);
				//				select($scope.impression, 12);
				//			} else {
				//				select($scope.people, 10);
				//				select($scope.scenery, 10);
				//				select($scope.humanity, 10);
				//				select($scope.impression, 10);
				//			}
				// 加工过后的数据
				$scope.allLists = [];
				$scope.allLists.push($scope.people, $scope.scenery, $scope.humanity, $scope.impression);
			});

			$http.get("/json/album_category.json")
				.success(function (_data) {
					$scope.classItems = _data;
				});
			$scope.$on('ngRepeatFinished', function () {
				// 下面是在dom render完成后执行的js
				// 所有相册分类类目展示切换
				$('.album-category li').click(function () {
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
							function () {
								$('.album-category li').eq(_li_this).addClass('active');
								$(this).show();
								$('#j-category-view li').eq(_li_this).show()
							},
							function () {
								$(this).hide();
								$('#j-category-view li').eq(_li_this).hide();
								$('.album-category li.active').removeClass('active');
							}
						)
					});
			});
		}
};

define([
	   ,'angular'
	   ,'jquery.ui.slider'
], f)
