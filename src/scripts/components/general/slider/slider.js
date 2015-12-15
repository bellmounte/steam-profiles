(function (React) {
	'use strict';

	var SliderContents = require('./slider-contents');
	var shift = require('../../../util/shift');

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

	var style_hidden = {
		display: 'none'
	};

	module.exports = React.createClass({
		displayName: 'Slider',
		getInitialState: function() {
			return {
				currentShiftIndex: 0
			};
		},
		componentDidMount: function() {
			var tray = this.refs.slider.getElementsByClassName('slider-tray')[0];
			var arrow_next = this.refs.arrow_next;
			var arrow_prev = this.refs.arrow_prev;

			arrow_next.addEventListener('click', function () {
				if (this.props.onArrowRight) {
					this.props.onArrowRight();
				}

				shift.shiftLeft(tray, 1200, function () {
					this.setState({
						currentShiftIndex: this.state.currentShiftIndex + 1
					});
				}.bind(this));
			}.bind(this));

			arrow_prev.addEventListener('click', function () {
				if (this.props.onArrowLeft) {
					this.props.onArrowLeft();
				}

				shift.shiftRight(tray, 1200, function () {
					this.setState({
						currentShiftIndex: this.state.currentShiftIndex - 1
					});
				}.bind(this));
			}.bind(this));
		},
		render: function () {
			var style_prev = (this.state.currentShiftIndex > 0) ? style_arrows : style_hidden;

			var props_slider = {
				currentShiftIndex: this.state.currentShiftIndex,
				items: this.props.items,
				title: this.props.title,
			}

			return React.DOM.div({className: 'slider', style: style, ref: 'slider'},
				React.createElement(SliderContents, props_slider),
				React.DOM.a({className: 'slider-prev', style: style_prev, ref: 'arrow_prev'}),
				React.DOM.a({className: 'slider-next', style: style_arrows, ref: 'arrow_next'})
			);
		}
	});
})(window.React);
