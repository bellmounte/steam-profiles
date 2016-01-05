'use strict';

const api_steam = require('../steam/api/api');

global.app.get('/api/steam/users', function (req, res) {
	api_steam.getUsers(null, function (data) {
		res.send(data);
	});
});
