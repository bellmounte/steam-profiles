(function (React) {
	'use strict';

	var GamesItem = require('./games-list');

	module.exports = React.createClass({
		render: function () {
			return React.createElement('div', {className: 'page page-games'},
				React.DOM.h1({className: 'page-title' }, 'Games'),
				React.createElement(GamesItem, null)
			);
		}
	});

})(window.React);
