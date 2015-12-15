(function (React) {
	'use strict';

	var SliderItem = require('./slider-item');

	var style = {
		position: 'absolute'
	};

	module.exports = React.createClass({
		displayName: 'Slider Subtray',
		render: function () {

			var left_parent = 1200 * (this.props.currentShiftIndex - 1);
			var left = (200 * this.props.index);
			style.left = left + 'px';

			if (left >= left_parent && left <= left_parent + (1200*3)) {
				return React.DOM.div({className: 'slider-subtray', style: style},
					React.createElement(SliderItem, this.props.top),
					React.createElement(SliderItem, this.props.bottom)
				);
			}

			return null;
		}
	});
})(window.React);
