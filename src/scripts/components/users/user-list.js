(function (React, $) {
	'use strict';

	var UserItem = require('./users-list-item');
	var User = require('./user');
	var UsersStore = require('../../stores/data/usersStore');
	var SortHeader = require('../general/sort-header');

	var sorts = require('../../util/sorts');
	function getSort(sort) {
		switch (sort) {
			case('name'):
				return sorts.name_user;
			case('games'):
				return sorts.games;
			case('playtime'):
				return sorts.playtime;
			default:
				return sorts.playtime;
		}
	}

	var createItem = function (item) {
		item.type = 'user-list';
		item.key = item.steamid;
		item.uid = item.steamid;
		return React.createElement(UserItem, item);
	};

	var sort_columns = [
		{sort: 'name', text: 'Name'},
		{sort: 'achievements', text: 'Achievements'},
		{sort: 'playtime', text: 'Playtime'},
		{sort: 'games', text: 'Games'}
	];

	var cache_users = [];

	module.exports = React.createClass({
		displayName: 'UserList',

		getInitialState: function() {
			return {
				selectedUser: UsersStore.getSelectedUser(),
				sort: 'playtime',
				hasData: false
			};
		},

		componentDidMount: function() {
			UsersStore.addChangeListener(this._onChange);

			$.get('/api/steam/users', function(result) {
				if (this.isMounted()) {
					cache_users = result;
					this.setState({hasData: true});
				}
			}.bind(this));
		},

		componentWillUnmount: function() {
			UsersStore.removeChangeListener(this._onChange);
		},

		_onChange: function () {
			this.setState({selectedUser: UsersStore.getSelectedUser()});
		},

		handleSort: function (ev) {
			var sort = ev.target.dataset.sort;
			this.setState({
				sort: sort
			});
		},

		render: function () {
			if (this.state.selectedUser) {
				return React.createElement(User, {steamid: this.state.selectedUser});
			}

			if (cache_users.length > 0) {
				var sort = getSort(this.state.sort);
				cache_users.sort(sort);

				return React.DOM.div(null,
					React.createElement(SortHeader, {
						items: sort_columns,
						active: this.state.sort,
						click: this.handleSort
					}),
					React.DOM.ul({className: 'users-list'},
						cache_users.map(createItem)
					)
				);
			} else {
				return React.DOM.div({className: 'users-list loading'});
			}
		}
	});

})(window.React, window.jQuery);
