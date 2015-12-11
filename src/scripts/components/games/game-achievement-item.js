(function (React) {
	'use strict';

	module.exports = React.createClass({
		displayName: 'AchievementItem',
		render: function () {
			return React.createElement('li', {className: 'achievement-item'},

				React.createElement('div', {className: 'achievement-logo'},
					React.createElement('img', {className: 'achievement-image', src: this.props.icon})
				),
				React.createElement('div', {className: 'achievement-text'},
					React.createElement('div', {className: 'achievement-name'}, this.props.displayName),
					React.createElement('div', {className: 'achievement-description'}, this.props.description)
				)
			);
		}
	});

})(window.React);
