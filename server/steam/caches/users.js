'use strict';

const UsersCache = class {
	constructor() {
		this.users = {};
	}

	getUsers () {
		const _users = [];
		Object.keys(this.users).forEach(function (steamid) {
			const user = this.users[steamid];
			_users.push(user.toUserListItem());
		}.bind(this));
		return _users;
	}

	getUser (steamid) {
		return this.users[steamid].toUserItem();
	}

	addUser (user) {
		this.users[user.steamid] = user;
	}

	removeUser (user) {
		delete this.users[user.steamid];
	}

	hasUser(steamid) {
		return (typeof this.users[steamid] !== 'undefined');
	}
};

const cache_users = new UsersCache();
export {cache_users};
