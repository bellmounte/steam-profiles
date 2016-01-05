'use strict';

import {app} from './express';

// API Routes
import './routes/routes';

// Start Server
const server = app.listen(3000, function () {
	console.log('Server Started at http://localhost:%s', server.address().port);
});
