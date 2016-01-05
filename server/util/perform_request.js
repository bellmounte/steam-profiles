'use strict';

import http from 'http';
import querystring from 'querystring';

const queue_request = [];
let is_running = false;

function _getPathFromArgs (args) {
	const params = (args.params) ? args.params : {};
	return args.path + '?' + querystring.stringify(params);
}

function perform_request (args, callback) {
	const hostname = 'api.steampowered.com';
	const path = _getPathFromArgs(args);

	console.log('Performing api request: ', hostname + path);

	http.get({
		host: hostname,
		path: path
	}, function (response) {
		let error;
		let body = '';

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
		const item = queue_request.shift();

		perform_request(item.args, function (result) {
			if (typeof item.callback === 'function') {
				item.callback(result);
			}

			is_running = false;
			checkQueue();
		});
	}
}

export default function (args, callback) {
	queue_request.push({
		args: args,
		callback: callback
	});
	checkQueue();
};
