(function (React) {
	'use strict';

	// TODO: Localize
	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	function memberSince(timecreated) {
		if (!timecreated) {
			return;
		}
		var d = new Date(timecreated * 1000);
		return monthNames[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
	}

	module.exports = React.createClass({
		displayName: 'Game Member Since',
		render: function () {
			return React.DOM.h3({className: 'user-member-since'}, memberSince(this.props.timecreated));
		}
	});

})(window.React);
