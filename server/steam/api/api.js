(function () {
	'use strict';

	var key = require('./accounts').steam.key;
	var toJSON = require('../../util/toJSON');
	var perform_request = require('../../util/perform_request');

	// Using local variables in case I don't have time to hook up a DB. Even then, I'll probably still want to use a LRU cache.
	var cache_games = {};
	var cache_users = {};

	var queue_games_achievements = [];

	var API = {
		getGames: function (args, callback) {
			var _games = [];
			Object.keys(cache_games).forEach(function (key) {
				var game = cache_games[key];
				_games.push({
					appid: game.appid,
					displayName: game.displayName,
					gameName: game.gameName,
					icon: game.icon,
					logo: game.logo,
					count_achievements: (game.achievements) ? game.achievements.length : 0,
					count_owners: game.owners.length,
					average_completion: 0
				});
			});

			callback(_games);
		},
		getGameInfo: function (args, callback) {
			var appid = args.appid;
			if (cache_games[appid]) {
				callback(cache_games[appid]);
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
				if (result.data) {
					var data = toJSON(result.data);

					if (data) { // Does this need an else error check?
						var game = data.game;

						if (game) { // Does this need an else error check?
							if (!cache_games[appid]) {
								cache_games[appid] = {
									owners: []
								};
							}

							// Add new data from server, don't overwrite the node.
							cache_games[appid].appid = appid;
							cache_games[appid].gameName = game.gameName;

							if (game.availableGameStats) {
								cache_games[appid].achievements = game.availableGameStats.achievements;
								cache_games[appid].stats = game.availableGameStats.stats;
							}

							// TODO: Get Acheivement stats

							callback(cache_games[appid]);
						}
					}
				} else {
					callback(toJSON(result.error));
				}
			});
		},
		getUsers: function (args, callback) {
			var _users = [];
			Object.keys(cache_users).forEach(function (key) {
				var user = cache_users[key];
				_users.push({
					steamid: user.steamid,
					personaname: user.personaname,
					profileurl: user.profileurl,
					avatar: user.avatar,
					avatarmedium: user.avatarmedium,
					avatarfull: user.avatarfull,
					count_games: user.games.length,
					count_achievements: 0
				});
			});
			callback(_users);
		},
		getUserInfo: function (args, callback) {
			var steamid = args.steamid;
			if (cache_users[steamid]) {
				callback(cache_users[steamid]);
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

								if (!cache_users[steamid]) {
									cache_users[steamid] = {
										games: {}
									}
								}

								cache_users[steamid].steamid = user.steamid;
								cache_users[steamid].communityvisibilitystate = user.communityvisibilitystate;
								cache_users[steamid].profilestate = user.profilestate;
								cache_users[steamid].personaname = user.personaname;
								cache_users[steamid].lastlogoff = user.lastlogoff;
								cache_users[steamid].profileurl = user.profileurl;
								cache_users[steamid].avatar = user.avatar;
								cache_users[steamid].avatarmedium = user.avatarmedium;
								cache_users[steamid].avatarfull = user.avatarfull;
								cache_users[steamid].personastate = user.personastate;
								cache_users[steamid].realname = user.realname;
								cache_users[steamid].primaryclanid = user.primaryclanid;
								cache_users[steamid].timecreated = user.timecreated;
								cache_users[steamid].personastateflags = user.personastateflags;
								cache_users[steamid].loccountrycode = user.loccountrycode;
								cache_users[steamid].locstatecode = user.locstatecode;
								cache_users[steamid].loccityid = user.loccityid;
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

											if (!cache_games[appid]) {
												cache_games[appid] = {
													owners: []
												};

												queue_games_achievements.push(appid);
											}

											if (!cache_games[appid].appid) {
												cache_games[appid].appid = appid;
											}

											if (!cache_games[appid].displayName) {
												cache_games[appid].displayName = game.name;
											}

											if (!cache_games[appid].icon) {
												cache_games[appid].icon = game.img_icon_url;
											}

											if (!cache_games[appid].logo) {
												cache_games[appid].logo = game.img_logo_url;
											}

											if (typeof cache_games[appid].has_community_visible_stats === 'undefined') {
												cache_games[appid].has_community_visible_stats = game.has_community_visible_stats;
											}

											cache_users[steamid].games[appid] = {
												appid: appid,
												playtime_2weeks: game.playtime_2weeks,
												playtime_forever: game.playtime_forever
											}
										});
									}
								}

								callback(cache_users[steamid]);

								while (queue_games_achievements.length > 0) {
									var app_to_update = queue_games_achievements.shift();
									API.updateGameInfo({appid: app_to_update} , function(){});
								}
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
