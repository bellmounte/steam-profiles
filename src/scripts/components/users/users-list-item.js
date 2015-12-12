(function (React) {
	'use strict';

	var appDispatcher = require('../../dispatcher/AppDispatcher');
	var InfoValueLabel = require('../general/info-value-label');

	module.exports = React.createClass({
		displayName: 'UsersListItem',
		handleClick: function() {
			appDispatcher.dispatch({
				action: 'user-list-item-update',
				type: this.props.type,
				selectedItem: this.props.uid
			});
		},
		render: function () {
			var user = this.props;

			return (
				React.DOM.li({className: 'user-list-item', onClick: this.handleClick},
					React.DOM.div({className: 'user-info'},
						React.DOM.img({ alt:user.personaname, src: user.avatarmedium, className: 'user-avatar' }),
						React.DOM.span({className: 'user-name'}, user.personaname)
					),
					React.createElement(InfoValueLabel, {
						className: 'achievements-info',
						label: 'Games',
						value: this.props.count_achievements
					}),
					React.createElement(InfoValueLabel, {
						className: 'games-info',
						label: 'Games',
						value: (this.props.count_games) ? this.props.count_games : 0
					})
				)
			);
		}
	});

})(window.React);
