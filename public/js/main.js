requirejs.config({
	//Remember: only use shim config for non-AMD scripts,
	//scripts that do not already call define(). The shim
	//config will not work correctly if used on AMD scripts,
	//in particular, the exports and init config will not
	//be triggered, and the deps config will be confusing
	//for those cases.
	shim: {
		shim: {
			// jQuery的一些插件依赖写在这里，一下为示例
//			'jquery.colorize': {
//				deps: ['jquery'],
//				exports: 'jQuery.fn.colorize'
//			},
//			'jquery.scroll': {
//				deps: ['jquery'],
//				exports: 'jQuery.fn.scroll'
//			},
		}
	}
});
