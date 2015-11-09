$(function () {

	$('.nav-bar-menu span').hover(
		function () {
			$('.nav-bar-layout').show();
		},
		function () {
			$('.nav-bar-layout').hide();
			$('.nav-bar-layout').hover(
				function(){$('.nav-bar-layout').show();},
				function(){$('.nav-bar-layout').hide();}
			);
		})

});
