$(function () {

	$('.nav li').click(function () {
		$("li").removeAttr("class");
		$(this).addClass('active')
	});
	$('.search-bar').focusin(function() {
		$(this).find('.search-btn').addClass('search-btn-foucs')
	});
	$('.search-bar').focusout(function() {
		$(this).find('.search-btn').removeClass('search-btn-foucs')
	});

});
