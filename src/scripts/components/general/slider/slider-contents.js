(function (React) {
	'use strict';

	var SliderTitle = require('./slider-title');
	var SliderTrays = require('./slider-trays');

	module.exports = React.createClass({
		displayName: 'Slider Contents',
		render: function () {
			return React.DOM.div({className: 'slider-contents'},
				React.createElement(SliderTitle, {title: this.props.title}),
				React.createElement(SliderTrays, this.props)
			);
		}
	});
})(window.React);
