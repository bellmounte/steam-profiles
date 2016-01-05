'use strict';

const express = require('express');
global.app = express();

// Static Web Pages and Assets
app.use(express.static('public'));

// API Routes
require('./routes/routes');

// Start Server
const server = app.listen(3000, function () {
	console.log('Server Started at http://localhost:%s', server.address().port);
});
