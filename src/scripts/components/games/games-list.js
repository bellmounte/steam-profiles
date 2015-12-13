(function (React, $) {
	'use strict';

	var GameItem = require('./games-list-item');
	var Game = require('./game');
	var GamesStore = require('../../stores/data/gamesStore');
	var SortHeader = require('../general/sort-header');

	var sorts = require('../../util/sorts');
	var sort_columns = [
		{sort: 'name', text: 'Name'},
		{sort: 'achievements', text: 'Achievements'},
		{sort: 'owners', text: 'Owners'}
	];

	function getSort(sort) {
		switch (sort) {
			case('name'):
				return sorts.name_game;
			case('achievements'):
				return sorts.achievements;
			case('owners'):
				return sorts.owners;
			default:
				return sorts.owners;
		}
	}

	var cache_games = [];

	module.exports = React.createClass({
		displayName: 'GamesList',

		getInitialState: function() {
			return {
				selectedGame: GamesStore.getSelectedGame(),
				hasData: false,
				sort: 'owners'
			};
		},

		handleSort: function (ev) {
			var sort = ev.target.dataset.sort;
			this.setState({
				sort: sort
			});
		},

		componentDidMount: function() {
			GamesStore.addChangeListener(this._onChange);

			$.get('/api/steam/games', function(result) {
				if (this.isMounted()) {
					cache_games = result;
					this.setState({hasData: true});
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

			if (cache_games.length > 0) {
				var sort = getSort(this.state.sort);
				cache_games.sort(sort);

				return React.DOM.div(null,
					React.createElement(SortHeader, {
						items: sort_columns,
						active: this.state.sort,
						click: this.handleSort
					}),
					React.createElement('ul', {className: 'games-list'},
						cache_games.map(createItem)
					)
				);
			} else {
				return React.createElement('div', {className: 'games-list loading'});
			}
		}
	});

})(window.React, window.jQuery);
