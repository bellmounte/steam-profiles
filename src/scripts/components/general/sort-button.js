(function (React) {
	'use strict';

	module.exports = React.createClass({
		displayName: 'Sort Button',
		render: function () {
			var style = {
				borderRadius: '.25rem',
			    boxShadow: 'inset 0px 1px 3px rgba(0,0,0,0.5), rgba(255,255,255,0.16) 0px 1px 0px, rgba(255,255,255,0.05) 0px 0px 0px 1px',
				color: '#67c1f5',
				display: 'inline-block',
				fontSize: '1rem',
				margin: '0 .5rem',
				padding: '.5rem 1rem'
			};

			if (this.props.active) {
				style.background = '#67c1f5';
				style.color ='#fff';
			}

			return React.DOM.button({
				className: 'sort-button sort-button-' + this.props.sort,
				'data-sort': this.props.sort,
				onClick: this.props.onClick,
				type: 'button',
				style: style
			}, this.props.text);
		}
	});

})(window.React);
