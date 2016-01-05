'use strict';

import {API} from '../steam/api/api';
import {app} from '../express';

app.get('/api/steam/games', function (req, res) {
	API.getGames(null, function (data) {
		res.json(data);
	});
});
