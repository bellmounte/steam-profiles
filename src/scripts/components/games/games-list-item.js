(function (React) {
	'use strict';

	var appDispatcher = require('../../dispatcher/AppDispatcher');

	var GameName = require('./game-name');
	var GameLogo = require('./game-logo');

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
				React.DOM.div({className: 'trophy-info'},
					React.DOM.div({className: 'info-value'}, this.props.count_achievements),
					React.DOM.div({className: 'info-label'}, 'Achievements')
				) : null;

			var trophy_stats = (this.props.average_completion) ?
				React.DOM.div({className: 'trophy-stats'},
					React.DOM.div({className: 'info-value'}, this.props.average_completion),
					React.DOM.div({className: 'info-label'}, 'Average')
				) : null;

			return (
				React.DOM.li({className: 'game-list-item', onClick: this.handleClick},
					React.DOM.div({className: 'game-info'},
						React.createElement(GameLogo, this.props),
						React.createElement(GameName, this.props)
					),
					trophy_info,
					trophy_stats,
					React.DOM.div({className: 'owner-info'},
						React.DOM.div({className: 'info-value'}, ((this.props.count_owners) ? this.props.count_owners : 0)),
						React.DOM.div({className: 'info-label'}, 'Owners')
					)
				)
			);
		}
	});

})(window.React);
