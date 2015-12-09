(function (React) {
	'use strict';

	var GameItem = require('./games-list-item');
	var Game = require('./game');
	var GamesStore = require('../../stores/data/gamesStore');

	module.exports = React.createClass({
		displayName: 'GamesList',

		getInitialState: function() {
			return {
				selectedGame: GamesStore.getSelectedGame()
			};
		},

		componentDidMount: function() {
			GamesStore.addChangeListener(this._onChange);
		},

		componentWillUnmount: function() {
			GamesStore.removeChangeListener(this._onChange);
		},

		_onChange: function () {
			this.setState({selectedGame: GamesStore.getSelectedGame()});
		},

		render: function () {
			if (this.state.selectedGame) {
				var game = GamesStore.getGame(this.state.selectedGame);
				if (game) {
					return React.createElement(Game, {game: game});
				}
			}

			var createItem = function (item) {
				item.type = 'game-list';
				item.key = item.appid;
				item.uid = item.appid;

				return React.createElement(GameItem, item);
			};

			var games = GamesStore.getGames();
			return React.createElement('ul', {className: 'games-list'},
				games.map(createItem)
			);

		}
	});

})(window.React);
