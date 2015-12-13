(function (React) {
	'use strict';

	module.exports = React.createClass({
		displayName: 'AchievementItem',
		render: function () {
			return React.DOM.li({className: 'achievement-item'},

				React.DOM.div({className: 'achievement-logo'},
					React.DOM.img({className: 'achievement-image', src: this.props.icon})
				),
				React.DOM.div({className: 'achievement-text'},
					React.DOM.div({className: 'achievement-name'}, this.props.displayName),
					React.DOM.div({className: 'achievement-description'}, this.props.description)
				)
			);
		}
	});

})(window.React);
