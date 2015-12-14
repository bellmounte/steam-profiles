(function (React) {
	'use strict';

	var SliderContents = require('./slider-contents');

	var style = {
		padding: '1.5rem'
	};

	var style_arrows = {
		color: '#818181',
		fontSize: '3rem',
		height: '64px',
		lineHeight: '64px',
		position: 'absolute',
    	textAlign: 'center',
    	top: '100px',
    	width: '64px'
	};

	module.exports = React.createClass({
		displayName: 'Slider',
		handleClick: function (ev) {
			var arrow = ev.target;

			if (arrow.classList.contains('slider-next')) {
				if (this.props.onArrowRight) {
					this.props.onArrowRight();
				}
			}
			if (arrow.classList.contains('slider-prev')) {
				if (this.props.onArrowRight) {
					this.props.onArrowRight();
				}
			}
		},
		render: function () {
			return React.DOM.div({className: 'slider', style: style},
				React.createElement(SliderContents, this.props),
				React.DOM.a({className: 'slider-prev', onClick: this.handleClick, style: style_arrows}),
				React.DOM.a({className: 'slider-next', onClick: this.handleClick, style: style_arrows})
			);
		}
	});
})(window.React);
