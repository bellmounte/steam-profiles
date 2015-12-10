(function (React, $) {
	'use strict';

	function memberSince(user) {
		var d = new Date(user.timecreated * 1000);
		// TODO: Localize
		var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
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

				return React.createElement('div', {className: 'user'},
					React.createElement('header', {className: 'user-header'},
						React.createElement('div', {className: 'user-header-details'},
							React.DOM.h2({className: 'user-name'}, user.personaname),
							React.DOM.h3({className: 'user-realname'}, user.realname),
							React.DOM.h3({className: 'user-member-since'}, memberSince(user))
						),
						React.DOM.img({ alt:user.personaname, src: user.avatarfull, className: 'user-avatar' })
					),
					React.createElement('ul', {className: 'user-games'},
						React.createElement('header', {className: 'user-games-header'}, 'Games')
					)
				);
			} else {
				return React.createElement('div', {className: 'user'}, 'Loading');
			}
		}
	});

})(window.React, window.jQuery);
