(function (React) {
	'use strict';

	module.exports = React.createClass({
		displayName: 'Game Launch Buttom',
		render: function () {
			return React.DOM.a({className: 'button game-launch-button', href:'steam://run/' + this.props.appid }, 'Launch');
		}
	});

})(window.React);
