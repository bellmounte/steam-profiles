(function (React) {
	'use strict';

	module.exports = React.createClass({
		displayName: 'Game Logo',
		render: function () {

			var alt = (this.props.displayName) ? this.props.displayName : this.props.gameName;
			var src = 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/' + this.props.appid + '/' + this.props.logo + '.jpg';

			return React.createElement('img', {
				alt: alt,
				className: 'game-logo',
				src: src
			});

		}
	});

})(window.React);
