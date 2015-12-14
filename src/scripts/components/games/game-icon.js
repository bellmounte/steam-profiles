(function (React) {
	'use strict';

	var style = {
		height: '32px',
		width: '32px'
	};

	module.exports = React.createClass({
		displayName: 'Game Icon',
		render: function () {
			var fallback = '/images/icon-game.png';

			var alt = (this.props.displayName) ? this.props.displayName : this.props.gameName;
			var src = (this.props.icon) ?
				'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/' + this.props.appid + '/' + this.props.icon + '.jpg' :
				fallback;

			var onError = function () {
				this.refs.icon.src = fallback;
			}.bind(this);

			return React.DOM.img({
				alt: alt,
				className: 'game-icon',
				ref: 'icon',
				src: src,
				style: style,
				onError: onError
			});
		}
	});

})(window.React);
