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
				var _jsonUrl = "/json/" + type + "_list.json"
				$http.get(_jsonUrl)
					.success(function (_data) {
						$scope.showPicwall = [];
						_.each(_data, function(e1) {
							_.each(e1.imgs, function(e2) {
								e2.src = '../../' + e2.src;
								$scope.showPicwall.push(e2.src);
							})
						})
						// $scope.showPicwall = _.shuffle($scope.showPicwall);
					});
			}
		}
		whichType('people');
		whichType('private');
		whichType('scenery');
		$scope.$on('ngRepeatFinished', function () {
			var $container = $('.masonry');
			$container.imagesLoaded(function() {
				$container.masonry({
					gutterWidth: 1,
					gutterHeight: 1,
					itemSelector: '.item',
					isAnimated: true,
				});
			})
		})
	}
};

define(['angular', 'jquery.ui.masonry'], f)
