(function (React) {
	'use strict';

	var appDispatcher = require('../../dispatcher/AppDispatcher');

	module.exports = React.createClass({
		displayName: 'GamesListItem',
		handleClick: function(/*ev*/) {
			// ev.preventDefault();

			appDispatcher.dispatch({
				action: 'game-list-item-update',
				type: this.props.type,
				selectedItem: this.props.uid
			});
		},
		render: function () {

			var trophy_info = (this.props.achievements) ?
				React.DOM.div({className: 'trophy-info'},
					React.DOM.div({className: 'info-value'}, this.props.achievements.length),
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
						React.DOM.img({ alt:this.props.name, src: this.props.img, className: 'game-logo' }),
						React.DOM.span({className: 'game-title'}, this.props.name)
					),
					trophy_info,
					trophy_stats,
					React.DOM.div({className: 'owner-info'},
						React.DOM.div({className: 'info-value'}, this.props.owners),
						React.DOM.div({className: 'info-label'}, 'Owners')
					)
				)
			);
		}
	});

})(window.React);
