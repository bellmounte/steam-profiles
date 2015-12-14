(function (React) {
	'use strict';

	var GamesSlider = require('../games/games-slider');

	module.exports = React.createClass({
		displayName: 'HomePage',
		render: function () {
			return React.DOM.div({className: 'page page-home'},
				React.createElement(GamesSlider)
			);
		}
	});

})(window.React);
