(function (React) {
	'use strict';

	var appDispatcher = require('../../dispatcher/AppDispatcher');

	var GameName = require('./game-name');
	var GameLogo = require('./game-logo');
	var InfoValueLabel = require('../general/info-value-label');

	module.exports = React.createClass({
		displayName: 'GamesListItem',
		handleClick: function() {
			appDispatcher.dispatch({
				action: 'game-list-item-update',
				type: this.props.type,
				selectedItem: this.props.uid
			});
		},
		render: function () {
			var trophy_info = (this.props.count_achievements) ?
				React.createElement(InfoValueLabel, {
					className: 'trophy-info',
					label: 'Achievements',
					value: this.props.count_achievements
				}) : null;

			var trophy_stats = (this.props.average_completion) ?
				React.createElement(InfoValueLabel, {
					className: 'trophy-stats',
					label: 'Average',
					value: this.props.average_completion
				}) : null;

			return (
				React.DOM.li({className: 'game-list-item', onClick: this.handleClick},
					React.DOM.div({className: 'game-info'},
						React.createElement(GameLogo, this.props),
						React.createElement(GameName, this.props)
					),
					trophy_info,
					trophy_stats,
					React.createElement(InfoValueLabel, {
						className: 'owner-info',
						label: 'Owners',
						value: (this.props.count_owners) ? this.props.count_owners : 0
					})
				)
			);
		}
	});

})(window.React);
