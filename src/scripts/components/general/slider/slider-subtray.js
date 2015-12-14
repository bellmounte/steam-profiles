(function (React) {
	'use strict';

	var SliderItem = require('./slider-item');

	var style = {
		position: 'absolute'
	};

	module.exports = React.createClass({
		displayName: 'Slider Subtray',
		render: function () {

			style.left = (200 * this.props.index) + 'px';

			return React.DOM.div({className: 'slider-subtray', style: style},
				React.createElement(SliderItem, this.props.top),
				React.createElement(SliderItem, this.props.bottom)
			);
		}
	});
})(window.React);
