(function () {
	'use strict';

	// Caches
	const cache_games = require('../caches/games');
	const cache_users = require('../caches/users');

	// Classes
	var Game = require('../classes/game');
	var User = require('../classes/user');

	// Utilities
	var key = require('./accounts').steam.key;
	var toJSON = require('../../util/toJSON');
	var perform_request = require('../../util/perform_request');

	var API = {
		getGames: function (args, callback) {
			callback(cache_games.getGames());
		},
		getGameInfo: function (args, callback) {
			var appid = args.appid;
			if (cache_games.hasGame(appid)) {
				callback(cache_games.getGame(appid));
			} else {
				this.updateGameInfo (args, function () {
					callback(cache_games.getGame(appid));
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
				if (result.data) {
					var data = toJSON(result.data);

					if (data && data.game) {
						var game = data.game;
						game.appid = appid;


						if (cache_games.hasGame(appid)) {
							cache_games.updateGame(game);
						} else {
							let class_game = new Game(game);
							cache_games.addGame(class_game);
						}
						callback();
					}

				} else {
					callback(toJSON(result.error));
				}
			});
		},
		getUsers: function (args, callback) {
			callback(cache_users.getUsers());
		},
		getUserInfo: function (args, callback) {
			var steamid = args.steamid;

			if (cache_users.hasUser(steamid)) {
				callback(cache_users.getUser(steamid));
			} else {
				this.updateUserInfo (args, function (result) {
					callback(result);
				});
			}
		},
		updateUserInfo: function (args, callback) {
			var steamid = args.steamid;
			perform_request({
				path: '/ISteamUser/GetPlayerSummaries/v0002/',
				params: {
					steamids: steamid,
					key: key
				}
			}, function (result) {
				if (result.data) {
					var data = toJSON(result.data);

					if (data) {
						var _users = data.response.players;

						if (_users) {
							_users.forEach(function (user) {
								let class_user = new User(user);
								cache_users.addUser(class_user);
							});

							perform_request({
								path: '/IPlayerService/GetOwnedGames/v0001/',
								params: {
									steamid: steamid,
									key: key,
									include_appinfo: 1,
									include_played_free_games: 1
								}
							}, function (result) {

								if (result.data) {
									var data = toJSON(result.data);
									var _games = data.response.games;

									if (_games) {
										_games.forEach(function (game) {
											var appid = game.appid;

											if (cache_games.hasGame(appid)) {
												cache_games.updateGame(game);
											} else {
												let class_game = new Game(game);
												cache_games.addGame(class_game);

												API.updateGameInfo({appid: appid} , function(){});
											}

											cache_games.games[appid].addUser(steamid);

											cache_users.users[steamid].games[appid] = {
												appid: appid,
												playtime_2weeks: game.playtime_2weeks,
												playtime_forever: game.playtime_forever
											}
										});
									}
								}
								callback(cache_users.getUser(steamid));
							});
						}
					}
				} else {
					callback(toJSON(result.error));
				}
			});
		}
	};

	module.exports = API;
})();
