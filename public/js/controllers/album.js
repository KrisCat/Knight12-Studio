angular.module('album', [])
	   .controller('album', function ($scope) {
			$scope.info = {
				name: '《后棠》',
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
				{src: 'http://ww2.sinaimg.cn/mw690/0062ZzD9jw1exdpclu82qj32bc1jme83.jpg'},
				{src: 'http://ww2.sinaimg.cn/mw690/0062ZzD9jw1exdpcutw29j31jm2bc7wj.jpg'},
				{src: 'http://ww3.sinaimg.cn/mw690/0062ZzD9jw1exdpcfox7wj32bc1jme83.jpg'},
				{src: 'http://ww3.sinaimg.cn/mw690/0062ZzD9jw1exdpdcqcdcj32bc1jmu0y.jpg'},
				{src: 'http://ww2.sinaimg.cn/mw690/0062ZzD9jw1exdpcjbadgj31jm2bcb2b.jpg'},
				{src: 'http://ww2.sinaimg.cn/mw690/0062ZzD9jw1exdpdjpzqhj32bc1jmhdv.jpg'},
				{src: 'http://ww4.sinaimg.cn/mw690/0062ZzD9jw1exdpd2q4dpj32bc1jm1kz.jpg'},
				{src: 'http://ww3.sinaimg.cn/mw690/0062ZzD9jw1exdpcq9j3rj31jm2bcb2b.jpg'},
				{src: 'http://ww3.sinaimg.cn/mw690/0062ZzD9jw1exdpdgmg1lj329f1icu0y.jpg'},
				{src: 'http://ww2.sinaimg.cn/mw690/0062ZzD9jw1exdpd6mkpgj31jm2bce83.jpg'},
				{src: 'http://ww3.sinaimg.cn/mw690/0062ZzD9jw1exdpcyi3anj31jm2bcqv7.jpg'},
				{src: 'http://ww2.sinaimg.cn/mw690/0062ZzD9jw1exdpdpi15oj31jm2bckjn.jpg'},
				{src: 'http://ww3.sinaimg.cn/mw690/0062ZzD9jw1exdpdacjaej32bc1awe82.jpg'},
			];

	   })
	   .controller('album-nav', function ($scope) {

	   });
