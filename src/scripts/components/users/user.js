(function (React, $) {
	'use strict';

	var UserGameItem = require('./user-game-item');
	var UserMemberSince = require('./user-member-since');

	function createGameItem (item) {
		item.key = item.appid;
		return React.createElement(UserGameItem, item);
	}

	function sortGames (a, b) {
		if (a.playtime_forever > b.playtime_forever) {
			return -1;
		} else if (a.playtime_forever < b.playtime_forever) {
			return 1;
		} else if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
			return -1;
		} else if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
			return 1;
		}
		return 0;
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
				user.games.sort(sortGames);

				return React.DOM.div({className: 'user'},
					React.DOM.header({className: 'user-header'},
						React.DOM.div({className: 'user-header-details'},
							React.DOM.h2({className: 'user-name'}, user.personaname),
							React.DOM.h3({className: 'user-realname'}, user.realname),
							React.createElement(UserMemberSince, user)
						),
						React.DOM.img({ alt:user.personaname, src: user.avatarfull, className: 'user-avatar' })
					),
					React.DOM.ul({className: 'user-games'},
						React.DOM.header({className: 'user-games-header'}, 'Games'),
						React.DOM.ul({className: 'user-games-list'},
							user.games.map(createGameItem)
						)
					)
				);
			} else {
				return React.DOM.div({className: 'user loading'});
			}
		}
	});

})(window.React, window.jQuery);
