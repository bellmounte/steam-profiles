'use strict';

import {API} from '../steam/api/api';
import {app} from '../express';

app.get('/api/steam/user/:steamid', function (req, res) {
	const steamid = req.params.steamid;
	API.getUserInfo({steamid: steamid}, function (data) {
		res.json(data);
	});
});
