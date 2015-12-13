(function (React) {
	'use strict';

	var GamesList = require('./games-list');

	module.exports = React.createClass({
		displayName: 'Games Page',
		render: function () {
			return React.DOM.div({className: 'page page-games'},
				React.DOM.h1({className: 'page-title' }, 'Games'),
				React.createElement(GamesList, null)
			);
		}
	});

})(window.React);
