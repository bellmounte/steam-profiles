(function () {
	'use strict';

	var http = require('http');
	var querystring = require('querystring');
	var key = require('./accounts').steam.key;
	var toJSON = require('../../util/toJSON');

	function _getPathFromArgs (args) {
		var params = (args.params) ? args.params : {};
		return args.path + '?' + querystring.stringify(params);
	}

	function perform_request (args, callback) {

		var hostname = 'api.steampowered.com';
		var path = _getPathFromArgs(args);

		console.log('making api request: ', hostname + path);

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

	// Using local variables in case I don't have time to hook up a DB. Even then, I'll probably still want to use a LRU cache.
	var games = [];
	var users = [];

	module.exports = {
		getGameInfo: function (args, callback) {
			var appid = args.appid;
			if (!games[appid]) {
				this.updateGameInfo (args, function (result) {
					// Can I assume games[appid] will now be populated?
					callback(result);
				});
			} else {
				callback(games[appid]);
			}
		},
		updateGameInfo: function (args, callback) {
			var appid = args.appid;
			perform_request({
				path: '/ISteamUserStats/GetSchemaForGame/v2/',
				params: {
					appid: appid,
					key: key
				}
			}, function (result) {
				console.log(result);

				if (result.data) {
					var data = toJSON(result.data);

					if (data) { // Does this need an else error check?
						var game = data.game;

						if (game) { // Does this need an else error check?
							if (!games[appid]) {
								games[appid] = {};
							}

							// Add new data from server, don't overwrite the node.
							games[appid].gameName = game.gameName;
							games[appid].achievements = game.availableGameStats.achievements;
							games[appid].stats = game.availableGameStats.stats;

							// TODO: Get Acheivement stats

							callback(games[appid]);
						}
					}
				} else {
					callback(toJSON(result.error));
				}
			});
		}
	}
})();
