(function (React) {
	'use strict';

	var style = {
		border: '2px solid #fff',
		boxSizing: 'content-box',
		height: '69px',
		width: '184px',
		marginBottom: '16px',
		padding: '0'
	};

	module.exports = React.createClass({
		displayName: 'Slider Item',
		render: function () {
			var props_button = {
				className: 'slider-item-button',
				onClick: this.props.onClick,
				style: style
			};

			if (this.props.data) {
				Object.keys(this.props.data).forEach(function (key) {
					props_button['data-'+key] = this.props.data[key];
				}.bind(this));
			}

			return React.DOM.div({className: 'slider-item'},
				React.DOM.button(props_button,
					this.props.image
				)
			);
		}
	});
})(window.React);
