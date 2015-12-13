(function (React) {
	'use strict';

	var SortButton = require('./sort-button');

	var style = {
		background: '#305f80',
		padding: '.5rem',
		textAlign: 'right'
	};

	module.exports = React.createClass({
		displayName: 'Sort Header',
		render: function () {
			var createItem = function (item) {
				item.key = item.sort;
				item.onClick = this.props.click;
				item.active = (this.props.active === item.sort);
				return React.createElement(SortButton, item);
			}.bind(this);

			return React.DOM.div({className: 'sort-header', style: style},
				this.props.items.map(createItem)
			);
		}
	});

})(window.React);
