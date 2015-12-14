/**
 * ------------------------------------------
 * 印象系列（impression）控制器
 * @version  1.0
 * @update   2015/12/14
 * @author   cisheng(mrgaonju@gmail.com)
 * ------------------------------------------
 */

var f = function (angular, tpl) {

	//angular会自动根据controller函数的参数名，导入相应的服务
	return {
		controller: function ($scope, $stateParams, $http, $interval, $q) {

		},
		tpl: tpl
	};
};

define([
	'angular',
	'text!module/impression/impression.html'
], f)
