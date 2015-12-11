(function (React, $) {
	'use strict';

	function memberSince(timecreated) {
		if (!timecreated) {
			return;
		}
		var d = new Date(timecreated * 1000);
		// TODO: Localize
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
	}

	function generateIconSrc (props) {
		return 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/' + props.appid + '/' + props.icon + '.jpg';
	}

	function generateDisplayName (props) {
		return (props.displayName) ? props.displayName : props.gameName;
	}

	function createGameItem (item) {
		return React.createElement('li', {className: 'user-games-list-item'},
			React.DOM.div({className: 'game-info'},
				React.DOM.img({ alt: generateDisplayName(item), src: generateIconSrc(item), className: 'game-logo' }),
				React.DOM.span({className: 'game-title'}, generateDisplayName(item))
			),
			React.DOM.div({className: 'user-game-playtime'},
				React.DOM.div({className: 'info-value'}, item.playtime_forever),
				React.DOM.div({className: 'info-label'}, 'Minutes Played')
			),
			React.DOM.div({className: 'game-launch'},
				React.DOM.a({className: 'button game-launch-button', href:'steam://run/' + item.appid },
					'Launch'
				)
			)
		);
	};

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
							React.DOM.h3({className: 'user-member-since'}, memberSince(user.timecreated))
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
