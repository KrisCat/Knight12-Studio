 /**
  * ------------------------------------------
  * 生命是一段漫长的旅程。
  * 想了， 就去做。
  * 输了， 从头再来。
  * 摔了， 爬起来继续。
  * 赢了， 还要再往前走。
  * 死了， 没留下任何遗憾。
  * ------------------------------------------
  */

// 生活不只是眼前的苟且，还有诗和JavaScript。

;(function () {
	document.write('生命是一段漫长的旅程<br>');
	var life = new Life();
	while (life.state == 'alive') {
		document.write('想了， 就去做。<br>');
		var plan = new Plan();
		while (plan.state !== 'successed') {
			plan.state = plan.struggle();
			plan.state == 'fail' && document.write('输了， 从头再来。<br>')
				|| document.write('摔了， 爬起来继续。<br>');
		}
		document.write("赢了， 还要再往前走。<br>");
		life.state = life.isEnd();
	}
	document.write('……<br>……<br>死了， 没留下任何遗憾。<br>');
	confirm('喝下孟婆汤，再来一场轰轰烈烈的人生？') && location.reload();
})();

function Life() {
	this.state = 'alive';
	this.isEnd = function () {
		if (Math.floor(Math.random()*100) > 90) return 'dead';
		return 'alive';
	};
}
function Plan() {
	this.state = 'fail';
	this.struggle = function () {
		if (Math.floor(Math.random()*10) > 4) return 'successed';
		return 'fail';
	};
}



