/**
 * ------------------------------------------
 * 图片墙（status）控制器
 * @version  1.0
 * @update   2016/02/07
 * @author   小木瓜(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function () {
	return function ($scope, $http, $location) {
		$scope.activeTypeConfirm(0);

		function whichType(type) {
			if ($location.absUrl().indexOf(type) === -1) return;
			else {
				var _jsonUrl = "/json/" + type + "_list.json";
				$http.get(_jsonUrl)
					.success(function (_data) {
						//var _len = _data.length;
						var _newDate = [];
						for(var i = 0; i < 2; i++) {
							_newDate.push(_data[i]);
						}
						$scope.showPicwall = [];
						_.each(_newDate, function (e1) {
								_.each(e1.imgs, function (e2) {
									e2.src = '../../' + e2.src;
									$scope.showPicwall.push(e2.src);
								})
							});
							// $scope.showPicwall = _.shuffle($scope.showPicwall);
					});
			}
		}
		whichType('people');
		whichType('private');
		whichType('scenery');
		whichType('love');
		$scope.$on('ngRepeatFinished', function () {
			var $container = $('.masonry');
			$container.imagesLoaded(function () {
					$container.masonry({
						gutterWidth: 1,
						gutterHeight: 1,
						itemSelector: '.item',
						isAnimated: true,
					});
				})
			// 图片滚动延迟加载
			$(".masonry .item img").lazyload({
				effect: "fadeIn"
			});
			var imgNum = $('.masonry .item img').length;
			$('.masonry .item img').load(function () {
				if (!--imgNum) {
					setTimeout(function () {
						$('.loading').hide();
						$container.show();
					}, 400)
				}
			});
		})
	}
};

define(['angular'
	   , 'jquery.ui.masonry'
	   , 'jquery.ui.lazyload'
], f);
