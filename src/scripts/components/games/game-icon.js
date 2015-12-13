(function (React) {
	'use strict';

	module.exports = React.createClass({
		displayName: 'Game Icon',
		render: function () {

			var alt = (this.props.displayName) ? this.props.displayName : this.props.gameName;
			var src = (this.props.icon) ?
				'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/' + this.props.appid + '/' + this.props.icon + '.jpg' :
				'http://placehold.it/32x32?text=+';

			return React.createElement('img', {
				alt: alt,
				className: 'game-icon',
				src: src
			});
		}
	});

})(window.React);
