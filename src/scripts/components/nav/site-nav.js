(function (React) {
	'use strict';

	var NavItem = require('./nav-item');

	module.exports = React.createClass({
		getInitialState: function () {
			return {
				items: [{
					id: 'home',
					name: 'Home'
				},{
					id: 'games',
					name: 'Games'
				},{
					id: 'users',
					name: 'Users'
				}]
			};
		},
		render: function () {
			var createItem = function createItem(item) {
				return React.createElement(NavItem, {
					key: item.id,
					name: item.name,
					type: 'site-nav',
					uid: item.id
				});
			};
			return React.createElement('nav', {className: 'site-nav'},
				React.createElement('ul', {className: 'site-nav-list'}, this.state.items.map(createItem))
			);
		}
	});

})(window.React);
