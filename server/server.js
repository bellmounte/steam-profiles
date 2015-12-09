var express = require('express');
var app = express();

app.use(express.static('public'));

var api_steam = require('./steam/api/api');

app.get('/api/steam/game/:appid', function (req, res) {
	api_steam.getGameInfo({appid: req.params.appid}, function (data) {
		res.send(data);
	});
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Server Started at http://localhost:%s', port);
});
