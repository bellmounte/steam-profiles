(function () {
	'use strict';

	const cache_games = require('../caches/games');

	module.exports = class {
		constructor(user) {
			this.steamid = user.steamid;
			this.personaname = user.personaname;
			this.profileurl = user.profileurl;
			this.avatar = user.avatar;
			this.avatarmedium = user.avatarmedium;
			this.avatarfull = user.avatarfull;
			this.timecreated = user.timecreated;
			this.realname = user.realname;
			this.games = (user.games) ? user.games : {};
		}

		toUserListItem() {
			return {
				steamid: this.steamid,
				personaname: this.personaname,
				profileurl: this.profileurl,
				avatar: this.avatar,
				avatarmedium: this.avatarmedium,
				avatarfull: this.avatarfull,
				count_games: Object.keys(this.games).length,
				count_achievements: 0,
				count_playtime: Object.keys(this.games).reduce(function(previous, key){
					return previous + this.games[key].playtime_forever;
				}.bind(this), 0),
				timecreated: this.timecreated,
				realname: this.realname
			};
		}

		toUserItem() {
			var result = this.toUserListItem();
			result.games = [];
			Object.keys(this.games).forEach(function (key) {
				var user_game = this.games[key];
				var game_global = cache_games.getGame(key);

				result.games.push({
					appid: user_game.appid,
					playtime_forever: user_game.playtime_forever,
					playtime_2weeks: user_game.playtime_2weeks,
					displayName: game_global.displayName,
					icon: game_global.icon,
					logo: game_global.logo,
					count_achievements: (game_global.achievements) ? game_global.achievements.length : 0
				});
			}.bind(this));
			return result;
		}
	};
})();
