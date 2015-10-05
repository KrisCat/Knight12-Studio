$(document).ready(function () {

	$('.nav li').click(function () {
		$("li").removeAttr("class");
		$(this).addClass('active')
	});

});
