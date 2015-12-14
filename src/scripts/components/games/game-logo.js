(function (React) {
	'use strict';

	var style = {
		height: '69px',
		width: '184px'
	};

	module.exports = React.createClass({
		displayName: 'Game Logo',
		render: function () {

			var alt = (this.props.displayName) ? this.props.displayName : this.props.gameName;
			var src = (this.props.logo) ?
				'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/' + this.props.appid + '/' + this.props.logo + '.jpg' :
				'http://placehold.it/184x69?text=Logo';

			return React.DOM.img({
				alt: alt,
				className: 'game-logo',
				src: src,
				style: style
			});
		}
	});

})(window.React);
