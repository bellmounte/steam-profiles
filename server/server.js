(function () {
	'use strict';

	var express = require('express');
	var app = express();

	// Static Web Pages and Assets
	app.use(express.static('public'));

	// API Routes
	var api_steam = require('./steam/api/api');
	app.get('/api/steam/game/:appid', function (req, res) {
		var appid = Number(req.params.appid);
		// TODO: Handle isNaN(appid)
		api_steam.getGameInfo({appid: appid}, function (data) {
			res.send(data);
		});
	});
	app.get('/api/steam/games', function (req, res) {
		api_steam.getGames(null, function (data) {
			res.send(data);
		});
	});
	app.get('/api/steam/user/:steamid', function (req, res) {
		var steamid = Number(req.params.steamid);
		// TODO: Handle isNaN(steamid)
		api_steam.getUserInfo({steamid: steamid}, function (data) {
			res.send(data);
		});
	});

	// Start Server
	var server = app.listen(3000, function () {
		var host = server.address().address;
		var port = server.address().port;

		console.log('Server Started at http://localhost:%s', port);
	});

})();
