(function (React) {
	'use strict';

	var appDispatcher = require('../../dispatcher/AppDispatcher');

	module.exports = React.createClass({
		handleClick: function(ev) {
			ev.preventDefault();
			appDispatcher.dispatch({
				action: 'nav-item-update',
				type: this.props.type,
				selectedItem: this.props.uid
			});
		},
		render: function () {
			return (
				React.DOM.li({className: 'nav-item'},
					React.DOM.button({className: 'nav-item-button', type: 'button', onClick: this.handleClick},
						React.DOM.span({className: 'nav-item-text'},
							this.props.name
						)
					)
				)
			);
		}
	});

})(window.React);
