(function () {
	'use strict';

	window.React = require('react');
	window.ReactDOM = require('react-dom');


	var ReactDOM = window.ReactDOM;

	var content = document.getElementById('content');

	content.classList.remove('loading');
	ReactDOM.render(
		React.createElement('h1', null, 'Hello, world!'),
		content
	);
})();
