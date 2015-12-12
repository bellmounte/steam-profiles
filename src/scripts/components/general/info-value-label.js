(function (React) {
	'use strict';

	module.exports = React.createClass({
		displayName: 'Info Value Label',
		render: function () {
			return React.DOM.div({className: this.props.className},
				React.DOM.div({className: 'info-value'}, this.props.value),
				React.DOM.div({className: 'info-label'}, this.props.label)
			);
		}
	});

})(window.React);
