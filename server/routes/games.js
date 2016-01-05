'use strict';

const api_steam = require('../steam/api/api');

global.app.get('/api/steam/games', function (req, res) {
	api_steam.getGames(null, function (data) {
		res.send(data);
	});
});
