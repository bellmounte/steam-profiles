(function (React) {
	'use strict';

	module.exports = React.createClass({
		render: function () {
			return React.createElement('div', {className: 'page page-users'},
				React.DOM.h1({className: 'page-title' }, 'Users')
			);
		}
	});

})(window.React);
