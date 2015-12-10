(function () {
	'use strict';

	var key = require('./accounts').steam.key;
	var toJSON = require('../../util/toJSON');
	var perform_request = require('../../util/perform_request');

	// Using local variables in case I don't have time to hook up a DB. Even then, I'll probably still want to use a LRU cache.
	var games = [];
	var users = [];

	module.exports = {
		getGames: function (args, callback) {
			var _games = [];
			games.forEach(function (game) {
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
				console.log('updateGameInfo', appid, result);

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
							games[appid].appid = appid;
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
		},
		getUsers: function (args, callback) {
		},
		getUserInfo: function (args, callback) {
			var steamid = args.steamid;
			if (users[steamid]) {
				callback(users[steamid]);
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
				console.log('updateUserInfo', steamid, result);

				if (result.data) {
					var data = toJSON(result.data);

					if (data) { // Does this need an else error check?
						var _users = data.response.players;

						if (_users) { // Does this need an else error check?
							_users.forEach(function (user) {

								if (!users[steamid]) {
									users[steamid] = {
										games: []
									}
								}

								users[steamid].steamid = user.steamid;
								users[steamid].communityvisibilitystate = user.communityvisibilitystate;
								users[steamid].profilestate = user.profilestate;
								users[steamid].personaname = user.personaname;
								users[steamid].lastlogoff = user.lastlogoff;
								users[steamid].profileurl = user.profileurl;
								users[steamid].avatar = user.avatar;
								users[steamid].avatarmedium = user.avatarmedium;
								users[steamid].avatarfull = user.avatarfull;
								users[steamid].personastate = user.personastate;
								users[steamid].realname = user.realname;
								users[steamid].primaryclanid = user.primaryclanid;
								users[steamid].timecreated = user.timecreated;
								users[steamid].personastateflags = user.personastateflags;
								users[steamid].loccountrycode = user.loccountrycode;
								users[steamid].locstatecode = user.locstatecode;
								users[steamid].loccityid = user.loccityid;
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
								console.log('updateUserInfo_games', steamid, result);

								if (result.data) {
									var data = toJSON(result.data);
									var _games = data.response.games;

									console.log('data:', data);

									_games.forEach(function (game) {
										var appid = game.appid;

										if (!games[appid]) {
											games[appid] = {
												owners: []
											};
										}

										if (!games[appid].appid) {
											games[appid].appid = appid;
										}

										if (!games[appid].displayName) {
											games[appid].displayName = game.name;
										}

										if (!games[appid].icon) {
											games[appid].icon = game.img_icon_url;
										}

										if (!games[appid].logo) {
											games[appid].logo = game.img_logo_url;
										}

										if (typeof games[appid].has_community_visible_stats === 'undefined') {
											games[appid].has_community_visible_stats = game.has_community_visible_stats;
										}

										// TODO: Figure out a good way to store this data
										// users[steamid].games[appid] = {
										// 	appid: appid,
										// 	playtime_2weeks: game.playtime_2weeks,
										// 	playtime_forever: game.playtime_forever
										// }
									});
								}

								callback(users[steamid]);
							});
						}
					}
				} else {
					callback(toJSON(result.error));
				}
			});
		}
	}
})();
