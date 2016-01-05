'use strict';

import {API} from '../steam/api/api';
import {app} from '../express';

app.get('/api/steam/game/:appid', function (req, res) {
	const appid = Number(req.params.appid);

	// Handle invalid appid
	if (isNaN(appid)) {
		return res.send({
			error: 'Invalid appid'
		});
	}

	API.getGameInfo({appid: appid}, function (data) {
		res.send(data);
	});
});
