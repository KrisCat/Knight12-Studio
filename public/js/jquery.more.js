$(function () {

	$('.nav li').click(function () {
		$("li").removeAttr("class");
		$(this).addClass('active')
	});
	$('.search-bar').focusin(function () {
		$(this).find('.search-btn').addClass('search-btn-foucs')
	});
	$('.search-bar').focusout(function () {
		$(this).find('.search-btn').removeClass('search-btn-foucs')
	});

	$('.nav-bar-menu span').hover(
		function () {
			$('nav-bar-layout:visible');
		},
		function () {
			$('nav-bar-layout:hidden');
		})

});
