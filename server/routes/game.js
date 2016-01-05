'use strict';

const api_steam = require('../steam/api/api');

global.app.get('/api/steam/game/:appid', function (req, res) {
	let appid = Number(req.params.appid);

	// Handle invalid appid
	if (isNaN(appid)) {
		return res.send({
			error: 'Invalid appid'
		});
	}

	api_steam.getGameInfo({appid: appid}, function (data) {
		res.send(data);
	});
});
