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
			$('.nav-bar-layout').show();
			$(this).index() !== 0 && $('.category ul').eq($(this).index()-1).addClass('ul-active')
		},
		function () {
			$('.nav-bar-layout ul').removeClass('ul-active');
			$('.nav-bar-layout').hide();
			$('.nav-bar-layout').hover(
				function(){$('.nav-bar-layout').show();},
				function(){$('.nav-bar-layout').hide();}
			);
	});
	$('.category ul').hover(
		function(){
			$(this).addClass('ul-active')
			$('.nav-bar-menu span').eq($(this).index()+1).addClass('span-hover');
		},
		function(){
			$(this).removeClass('ul-active')
			$('.nav-bar-menu span').eq($(this).index()+1).removeClass('span-hover');
		}
	);
	$('.search-btn').click(function(){
		alert('啊，这只程序猿好像还没来得及写搜索功能-_-!');
	})
});
