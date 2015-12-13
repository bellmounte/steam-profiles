(function () {
	'use strict';

	var UsersCache = class {
		constructor() {
			this.users = {};
		}

		getUsers () {
			let _users = [];
			Object.keys(this.users).forEach(function (steamid) {
				let user = this.users[steamid];
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
	}

	const cache_users = new UsersCache();
	module.exports = cache_users;
})();
