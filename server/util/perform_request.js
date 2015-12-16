(function () {
	'use strict';

	var http = require('http');
	var querystring = require('querystring');

	var queue_request = [];
	var is_running = false;

	function _getPathFromArgs (args) {
		var params = (args.params) ? args.params : {};
		return args.path + '?' + querystring.stringify(params);
	}

	function perform_request (args, callback) {
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

	function checkQueue () {
		if (is_running) {
			return;
		}

		if (queue_request.length > 0) {
			is_running = true;
			var item = queue_request.shift();

			perform_request(item.args, function (result) {
				if (typeof item.callback === 'function') {
					item.callback(result);
				}

				is_running = false;
				checkQueue();
			});
		}
	}

	module.exports = function (args, callback) {
		queue_request.push({
			args: args,
			callback: callback
		});
		checkQueue();
	};
})();
