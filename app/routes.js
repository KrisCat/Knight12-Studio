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
	app.get('/people/picwall', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/people/list/all', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/people/list/environment', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/people/list/film', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/people/list/black', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/people/list/other', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/private/picwall', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/private/list/all', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/private/list/japan', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/private/list/clear', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/private/list/other', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/scenery/picwall', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/scenery/list/all', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/scenery/list/travel', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/scenery/list/city', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/scenery/list/micro', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/scenery/list/impress', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/love/picwall', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/love/list/all', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/love/list/creative', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/love/list/people', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/love/list/scenery', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/activity', function(req, res) {
		res.sendfile('./public/index.html');
	});
	app.get('/about', function(req, res) {
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
