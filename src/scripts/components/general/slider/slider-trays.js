(function (React) {
	'use strict';

	var SliderSubtray = require('./slider-subtray');
	var shift = require('../../../util/shift');

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
		componentDidMount: function() {
			var tray = this.refs.tray;
			// TODO: Fix these references
			var arrow_next = document.getElementsByClassName('slider-next')[0];
			var arrow_prev = document.getElementsByClassName('slider-prev')[0];

			arrow_next.addEventListener('click', function () {
				shift.shiftLeft(tray, 1200);
			});

			arrow_prev.addEventListener('click', function () {
				shift.shiftRight(tray, 1200);
			});
		},
		render: function () {
			var tray_items = [];
			var items = this.props.items;

			if (items) {
				for (var i = 0; i < items.length -1; i+=2) {
					var top = items[i];
					var bottom = items[i+1];

					tray_items.push({
						top: top,
						bottom: bottom,
						index: i/2
					});
				}
			}

			return React.DOM.div({className: 'slider-trays', style: style_trays},
				React.DOM.div({className: 'slider-tray', style: style_tray, ref: 'tray'},
					tray_items.map(createItem)
				)
			);
		}
	});
})(window.React);
