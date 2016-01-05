'use strict';

const api_steam = require('../steam/api/api');

global.app.get('/api/steam/user/:steamid', function (req, res) {
	const steamid = req.params.steamid;
	api_steam.getUserInfo({steamid: steamid}, function (data) {
		res.send(data);
	});
});
