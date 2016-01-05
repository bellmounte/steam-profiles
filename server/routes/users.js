'use strict';

import {API} from '../steam/api/api';
import {app} from '../express';

app.get('/api/steam/users', function (req, res) {
	API.getUsers(null, function (data) {
		res.json(data);
	});
});
