(function (React, $) {
	'use strict';

	var UserGameItem = require('./user-game-item');
	var UserMemberSince = require('./user-member-since');

	function createGameItem (item) {
		item.key = item.appid;
		return React.createElement(UserGameItem, item);
	}

	module.exports = React.createClass({
		displayName: 'User',
		getInitialState: function() {
			return {
				user: null
			};
		},
		componentDidMount: function() {
			$.get('/api/steam/user/' + this.props.steamid, function(result) {
				if (this.isMounted()) {
					this.setState({user: result});
				}
			}.bind(this));
		},
		render: function () {

			if (this.state.user) {
				var user = this.state.user;
				user.games.sort(function (a, b) {
					if (a.playtime_forever > b.playtime_forever) {
						return -1;
					}
					if (a.playtime_forever < b.playtime_forever) {
						return 1;
					}
					if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
						return -1;
					}
					if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
						return 1;
					}
					return 0;
				});

				return React.createElement('div', {className: 'user'},
					React.createElement('header', {className: 'user-header'},
						React.createElement('div', {className: 'user-header-details'},
							React.DOM.h2({className: 'user-name'}, user.personaname),
							React.DOM.h3({className: 'user-realname'}, user.realname),
							React.createElement(UserMemberSince, user)
						),
						React.DOM.img({ alt:user.personaname, src: user.avatarfull, className: 'user-avatar' })
					),
					React.createElement('ul', {className: 'user-games'},
						React.createElement('header', {className: 'user-games-header'}, 'Games'),
						React.createElement('ul', {className: 'user-games-list'},
							user.games.map(createGameItem)
						)
					)
				);
			} else {
				return React.createElement('div', {className: 'user'}, 'Loading');
			}
		}
	});

})(window.React, window.jQuery);
