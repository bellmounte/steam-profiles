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
		getGames: function (args, callback) {
			var _games = [];
			games.forEach(function (game) {
				_games.push({
					appid: game.appid,
					gameName: game.gameName,
					count_achievements: (game.achievements) ? game.achievements.length : 0,
					count_owners: game.owners.length,
					average_completion: 0
				});
			});

			callback(_games);
		},
		getGameInfo: function (args, callback) {
			var appid = args.appid;
			if (games[appid]) {
				callback(games[appid]);
			} else {
				this.updateGameInfo (args, function (result) {
					callback(result);
				});
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
								games[appid] = {
									owners: []
								};
							}

							// Add new data from server, don't overwrite the node.
							games[appid].appid = Number(appid);
							games[appid].gameName = game.gameName;

							if (game.availableGameStats) {
								games[appid].achievements = game.availableGameStats.achievements;
								games[appid].stats = game.availableGameStats.stats;
							}

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
