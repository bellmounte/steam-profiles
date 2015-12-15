(function (React) {
	'use strict';

	var SliderSubtray = require('./slider-subtray');

	var style_trays = {
		height: '200px',
		margin: '1rem 4rem',
		position: 'relative',
		overflow: 'hidden'
	};

	var style_tray = {
		position: 'relative'
	};

	var createItem = function (item) {
		item.key = item.index;
		return React.createElement(SliderSubtray, item);
	};

	module.exports = React.createClass({
		displayName: 'Slider Trays',
		render: function () {
			var tray_items = [];
			var items = this.props.items;

			if (items) {
				for (var i = 0; i < items.length -1; i+=2) {
					var top = items[i];
					var bottom = items[i+1];

					tray_items.push({
						currentShiftIndex: this.props.currentShiftIndex,
						top: top,
						bottom: bottom,
						index: i/2
					});
				}
			}

			return React.DOM.div({className: 'slider-trays', style: style_trays},
				React.DOM.div({className: 'slider-tray', style: style_tray},
					tray_items.map(createItem)
				)
			);
		}
	});
})(window.React);
