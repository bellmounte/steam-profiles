(function (React) {
	'use strict';

	var style = {
		color: '#aaa',
		fontFamily: '"Flama",Helvetica,Arial,Verdana,sans-serif',
		fontSize: '26px',
		fontWeight: '200',
		marginLeft: '4rem',
		textShadow: '0 1px 0 rgba(255,255,255,0.9)',
		textTransform: 'uppercase'
	};

	module.exports = React.createClass({
		displayName: 'Slider Title',
		render: function () {
			return React.DOM.h3({
				className: 'slider-title',
				style: style
			}, this.props.title);
		}
	});
})(window.React);
