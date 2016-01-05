'use strict';

const GamesCache = class {
	constructor() {
		this.games = {};
	}

	getGames () {
		const _games = [];
		Object.keys(this.games).forEach(function (appid) {
			const game = this.games[appid];
			_games.push(game.toGameListItem());
		}.bind(this));
		return _games;
	}

	getGame (appid) {
		if (this.games[appid]) {
			return this.games[appid].toGameItem();
		}
		return {};
	}

	addGame (game) {
		this.games[game.appid] = game;
	}

	updateGame (game) {
		this.games[game.appid].update(game);
	}

	removeGame (game) {
		delete this.games[game.appid];
	}

	hasGame(appid) {
		return (typeof this.games[appid] !== 'undefined');
	}
};

const cache_games = new GamesCache();

module.exports = cache_games;
