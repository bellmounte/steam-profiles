(function (React) {
	'use strict';

	var GameIcon = require('../games/game-icon');
	var GameName = require('../games/game-name');
	var InfoValueLabel = require('../general/info-value-label');

	module.exports = React.createClass({
		displayName: 'User Game Item',
		render: function () {
			return React.DOM.li({className: 'user-games-list-item'},
				React.DOM.div({className: 'game-info'},
					React.createElement(GameIcon, this.props),
					React.createElement(GameName, this.props)
				),
				React.createElement(InfoValueLabel, {
					className: 'user-game-playtime',
					label: 'Minutes Played',
					value: this.props.playtime_forever
				}),
				React.DOM.div({className: 'game-launch'},
					React.DOM.a({className: 'button game-launch-button', href:'steam://run/' + this.props.appid },
						'Launch'
					)
				)
			);
		}
	});

})(window.React);
