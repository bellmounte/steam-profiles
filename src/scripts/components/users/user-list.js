(function (React, $) {
	'use strict';

	var UserItem = require('./users-list-item');
	var User = require('./user');
	var UsersStore = require('../../stores/data/usersStore');

	module.exports = React.createClass({
		displayName: 'UserList',

		getInitialState: function() {
			return {
				selectedUser: UsersStore.getSelectedUser(),
				users: []
			};
		},

		componentDidMount: function() {
			UsersStore.addChangeListener(this._onChange);

			$.get('/api/steam/users', function(result) {
				if (this.isMounted()) {
					this.setState({users: result});
				}
			}.bind(this));
		},

		componentWillUnmount: function() {
			UsersStore.removeChangeListener(this._onChange);
		},

		_onChange: function () {
			this.setState({selectedUser: UsersStore.getSelectedUser()});
		},

		render: function () {
			if (this.state.selectedUser) {
				return React.createElement(User, {steamid: this.state.selectedUser});
			}

			var createItem = function (item) {
				item.type = 'user-list';
				item.key = item.steamid;
				item.uid = item.steamid;

				return React.createElement(UserItem, item);
			};

			return React.createElement('ul', {className: 'users-list'},
				this.state.users.map(createItem)
			);
		}
	});

})(window.React, window.jQuery);
