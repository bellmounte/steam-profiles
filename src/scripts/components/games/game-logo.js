(function (React) {
	'use strict';

	var style = {
		height: '69px',
		width: '184px'
	};

	module.exports = React.createClass({
		displayName: 'Game Logo',
		render: function () {
			var fallback = '/images/logo-game.png';

			var alt = (this.props.displayName) ? this.props.displayName : this.props.gameName;
			var src = (this.props.logo) ?
				'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/' + this.props.appid + '/' + this.props.logo + '.jpg' :
				fallback;

			var onError = function () {
				this.refs.logo.src = fallback;
			}.bind(this);

			return React.DOM.img({
				alt: alt,
				className: 'game-logo',
				ref: 'logo',
				src: src,
				style: style,
				onError: onError
			});
		}
	});

})(window.React);
