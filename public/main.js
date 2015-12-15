/**
 * ------------------------------------------
 * 配置require.js
 * @version  1.0
 * @update   2015/12/13
 * @author   cisheng(mrgaonju@gmail.com)
 * ------------------------------------------
 */

'use strict';

(function (win) {
	//配置baseUrl
	var baseUrl = document.getElementById('main').getAttribute('data-baseurl');

	/*
	 * 文件依赖
	 */
	var config = {
		baseUrl: baseUrl, //依赖相对路径
		paths: { //如果某个前缀的依赖不是按照baseUrl拼接这么简单，就需要在这里指出
			jquery: 'libs/jquery.min',
			'jquery.ui.slider': 'libs/plugins/slider',
			'jquery.ui.lightbox': 'libs/plugins/lightbox.min',
			'jquery.ui.stickUp': 'libs/plugins/stickUp.min',
			underscore: 'libs/underscore.min',
			angular: 'libs/angular.min',
			'angular-route': 'libs/angular-route',
			text: 'libs/text' //用于requirejs导入html类型的依赖
		},
		shim: { //引入没有使用requirejs模块写法的类库。配置不兼容的模块，例如underscore这个类库，本来会有一个全局变量'_'。这里shim等于快速定义一个模块，把原来的全局变量'_'封装在局部，并导出为一个exports，变成跟普通requirejs模块一样
			underscore: {
				exports: '_'
			},
			angular: {
				deps: ['jquery','underscore'],
				exports: 'angular'
			},
			'angular-route': {
				deps: ['angular'], //依赖什么模块
				exports: 'ngRouteModule'
			},
			'jquery.ui.slider': ['jquery'],
			'jquery.ui.lightbox': ['jquery'],
			'jquery.ui.stickUp': ['jquery']
		}
	};

	require.config(config);

	/**
	 * 手工启动angular
	 * @webapp  刚才定义的angular module
	 */
	require(['jquery', 'underscore', 'jquery.ui.slider', 'jquery.ui.lightbox', 'jquery.ui.stickUp'], function($, _) {
		require(['angular', 'router'], function (angular) {
			angular.bootstrap(document, ['webapp']);
		});
	});

})(window);
