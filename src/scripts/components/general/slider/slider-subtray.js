(function (React) {
	'use strict';

	var SliderItem = require('./slider-item');

	var style = {
		position: 'absolute'
	};

	module.exports = React.createClass({
		displayName: 'Slider Subtray',
		render: function () {
			var isVisible = true;
			var left = (200 * this.props.index);
			style.left = left + 'px';

			if (this.refs.subtray) {
				var trays = this.refs.subtray.parentNode;
				var left_trays = parseInt(trays.style.left, 10);

				if (!isNaN(left_trays)) {
					var viewWidth = Math.floor(trays.clientWidth / 200) * 200;
					if (left_trays + left  < 0 - viewWidth || left_trays + left > 2 * viewWidth) {
						isVisible = false;
					}
				}
			}

			if (isVisible) {
				return React.DOM.div({className: 'slider-subtray', style: style, ref: 'subtray'},
					React.createElement(SliderItem, this.props.top),
					React.createElement(SliderItem, this.props.bottom)
				);
			}

			return null;
		}
	});
})(window.React);
