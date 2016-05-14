module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes

	// frontend routes =========================================================
	// route to handle all angular requests
	// SPA路由
	app.get('/', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/people/*', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/private/*', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/scenery/*', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/love/*', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/activity', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/about', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/album/*', function(req, res) {
		res.sendfile('./public/index.html');
	});
	// 电影单
	app.get('/film', function(req, res) {
		res.sendfile('./public/film/001.html');
	});
	// 图片后台系统
	app.get('/login', function(req, res) {
		res.sendfile('./public/admin/login.html');
	});
};
