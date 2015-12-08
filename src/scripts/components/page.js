(function (React) {
	'use strict';

	var PageStore = require('../stores/pageStore');

	var HomePage = require('./home/page');
	var GamesPage = require('./games/page');
	var UsersPage = require('./users/page');

	module.exports = React.createClass({

		getActivePage: function () {
			switch (this.state.activePageUid) {
				case('home'):
					return HomePage;
				case('games'):
					return GamesPage;
				case('users'):
					return UsersPage;
				default:
					return HomePage;
			}
		},

		getInitialState: function() {
			return {
				activePageUid: 'home'
			};
		},

		componentDidMount: function() {
			PageStore.addChangeListener(this._onChange);
		},

		componentWillUnmount: function() {
			PageStore.removeChangeListener(this._onChange);
		},

		_onChange: function () {
			this.setState({activePageUid: PageStore.getPage()});
		},

		render: function () {
			var subview = this.getActivePage();
			return React.createElement('div', {className: 'page'},
				React.createElement(subview, null)
			);
		}
	});

})(window.React);
