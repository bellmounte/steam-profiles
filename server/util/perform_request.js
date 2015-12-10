(function () {
	'use strict';

	var http = require('http');
	var querystring = require('querystring');

	function _getPathFromArgs (args) {
		var params = (args.params) ? args.params : {};
		return args.path + '?' + querystring.stringify(params);
	}

	module.exports = function (args, callback) {

		var hostname = 'api.steampowered.com';
		var path = _getPathFromArgs(args);

		console.log('Performing api request: ', hostname + path);

		http.get({
			host: hostname,
			path: path
		}, function (response) {
			var error;
			var body = '';

			response.on('data', function (chunk) {
				body += chunk;
			});

			response.on('error', function(e) {
				error = e;
			});

			response.on('end', function () {
				callback({
					error: error,
					data: body
				});
			});
		}).on('error', function (e) {
			console.log('http.request.error: ', e);
			callback({
				error: e
			});
		});
	}

})();
