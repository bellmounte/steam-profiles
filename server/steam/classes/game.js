'use strict';

const Game = class {
	constructor(game) {
		this.appid = game.appid;
		this.name = game.name;
		this.gameName = game.gameName;
		this.img_icon_url = game.img_icon_url;
		this.img_logo_url = game.img_logo_url;
		this.users = (game.users) ? game.users : [];
		if (game.availableGameStats) {
			this.achievements = game.availableGameStats.achievements;
			this.stats = game.availableGameStats.stats;
		}
		this.owners = (game.owners) ? game.owners : [];
	}

	toGameItem() {
		const result = this.toGameListItem();
		result.achievements = this.achievements;
		result.owners = this.owners;
		return result;
	}

	toGameListItem() {
		return {
			appid: this.appid,
			displayName: this.name,
			gameName: this.gameName,
			icon: this.img_icon_url,
			logo: this.img_logo_url,
			count_achievements: (this.achievements) ? this.achievements.length : 0,
			count_owners: this.owners.length,
			average_completion: 0
		};
	}

	update(game) {
		if (game.availableGameStats) {
			if (game.availableGameStats.achievements) {
				this.achievements = game.availableGameStats.achievements;
			}
			if (game.availableGameStats.stats) {
				this.stats = game.availableGameStats.stats;
			}
		}

		for (let property in game) {
			if (game.hasOwnProperty(property)) {
				if (property !== 'availableGameStats' && property !== 'appid') {
					let value = game[property];
					this[property] = value;
				}
			}
		}
	}

	addUser(steamid) {
		if (this.owners.indexOf(steamid) === -1) {
			this.owners.push(steamid);
		}
	}
};

export {Game};
