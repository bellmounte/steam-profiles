'use strict';

const express = require('express');
global.app = express();

// Static Web Pages and Assets
app.use(express.static('public'));

// API Routes
require('./routes/routes');

// Start Server
var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log('Server Started at http://localhost:%s', port);
});
