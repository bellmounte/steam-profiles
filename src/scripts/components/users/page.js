(function (React) {
	'use strict';

	var UserList = require('./user-list');

	module.exports = React.createClass({
		displayName: 'UserPage',
		render: function () {
			return React.createElement('div', {className: 'page page-users'},
				React.DOM.h1({className: 'page-title' }, 'Users'),
				React.createElement(UserList, null)
			);
		}
	});

})(window.React);
