angular.module('album', [])
	.controller('album', ['$scope', '$location', '$anchorScroll', function ($scope, $location, $anchorScroll) {
		$scope.info = {
			id: '1001',
			name: '《后棠》',
			cover: 'img//album/1001/0.jpg',
			belong: '人像写真--其他',
			model: '@耳东耳东LION',
			//				device: 'Canon 5DMarkIII 35/1.4L',
			date: '2015-11-5',
			place: '南京·咖啡馆',
			author: '@摄影师羊驼',
			description: '如果，有醒不了的梦，我一定去做。如果，有走不完的路，我一定去走。如果，有变不了的爱，我一定去求。让懂的人懂，让不懂的人不懂，让世界是世界，我甘心是我的茧。',
			by: '——简媜《美丽的茧》'
		};
		$scope.imgs = [
			{
				src: 'img/album/1001/1.jpg'
			},
			{
				src: 'img/album/1001/2.jpg'
			},
			{
				src: 'img/album/1001/3.jpg'
			},
			{
				src: 'img/album/1001/4.jpg'
			},
			{
				src: 'img/album/1001/5.jpg'
			},
			{
				src: 'img/album/1001/6.jpg'
			},
			{
				src: 'img/album/1001/7.jpg'
			},
			{
				src: 'img/album/1001/8.jpg'
			},
			{
				src: 'img/album/1001/9.jpg'
			},
			{
				src: 'img/album/1001/10.jpg'
			},
			{
				src: 'img/album/1001/11.jpg'
			},
			{
				src: 'img/album/1001/12.jpg'
			},
			{
				src: 'img/album/1001/13.jpg'
			},
			];
		// 页面锚点解决方案
		$scope.goto = function (_id) {
			// set the location.hash to the id of
			// the element you wish to scroll to.
			$location.hash(_id);

			// call $anchorScroll()
			$anchorScroll();
		};
		// 单个相册侧边栏滚动悬浮
		$(function () {
				$('.nav-side').stickUp({
					//							topMargin : '55px'
					parts: {
						0: 'intro',
						1: 'imgFirst',
						2: 'imgFirst',
						3: 'footer'
					},
					itemHover: ''
				});
			})
		// 幻灯片浏览
		$(function () {
			$(".boxer").boxer({
				mobile: true
			});
		})
	}])

.controller('album-nav', function ($scope) {

});
