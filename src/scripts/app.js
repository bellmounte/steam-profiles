(function () {
	'use strict';

	window.React = require('react');
	window.ReactDOM = require('react-dom');
	window.jQuery = require('./includes/jquery-2.1.4.min');

	var React = window.React;
	var ReactDOM = window.ReactDOM;

	var content = document.getElementById('content');

	var SiteNav = require('./components/nav/site-nav');
	var Page = require('./components/page');

	var App = React.createClass({
		displayName: 'App',
		render: function render() {
			return React.createElement('div', null,
				React.DOM.header({ className: 'site-header' }, 'Steam Profiles Demo'),
				React.createElement(SiteNav, null),
				React.createElement(Page, null)
			);
		}
	});

	content.classList.remove('loading');
	ReactDOM.render(React.createElement(App, null), content);

})();
