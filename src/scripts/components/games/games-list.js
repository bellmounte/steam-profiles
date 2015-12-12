(function (React, $) {
	'use strict';

	var GameItem = require('./games-list-item');
	var Game = require('./game');
	var GamesStore = require('../../stores/data/gamesStore');

	function sortGames (a, b) {
		if (a.count_owners > b.count_owners) {
			return -1;
		} else if (a.count_owners < b.count_owners) {
			return 1;
		}

		var a_name = (a.displayName) ? a.displayName : a.gameName;
		var b_name = (b.displayName) ? b.displayName : b.gameName;
		if (a_name.toLowerCase() < b_name.toLowerCase()) {
			return -1;
		} else if (a_name.toLowerCase() > b_name.toLowerCase()) {
			return 1;
		}
		return 0;
	}

	module.exports = React.createClass({
		displayName: 'GamesList',

		getInitialState: function() {
			return {
				selectedGame: GamesStore.getSelectedGame(),
				games: []
			};
		},

		componentDidMount: function() {
			GamesStore.addChangeListener(this._onChange);

			$.get('/api/steam/games', function(result) {
				if (this.isMounted()) {
					this.setState({games: result});
				}
			}.bind(this));
		},

		componentWillUnmount: function() {
			GamesStore.removeChangeListener(this._onChange);
		},

		_onChange: function () {
			this.setState({selectedGame: GamesStore.getSelectedGame()});
		},

		render: function () {
			if (this.state.selectedGame) {
				return React.createElement(Game, {appid: this.state.selectedGame});
			}

			var createItem = function (item) {
				item.type = 'game-list';
				item.key = item.appid;
				item.uid = item.appid;

				return React.createElement(GameItem, item);
			};

			if (this.state.games.length > 0) {
				this.state.games.sort(sortGames);
				return React.createElement('ul', {className: 'games-list'},
					this.state.games.map(createItem)
				);
			} else {
				return React.createElement('div', {className: 'games-list loading'});
			}
		}
	});

})(window.React, window.jQuery);
