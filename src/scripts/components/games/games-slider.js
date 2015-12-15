(function (React, $) {
	'use strict';

	var appDispatcher = require('../../dispatcher/AppDispatcher');

	var Slider = require('../general/slider/slider');
	var GameLogo = require('./game-logo');

	var random = require('../../util/random');

	var style = {
		background: '#f1f1f1',
		position: 'relative'
	};

	var cache_games = [];
	var items = [];

	module.exports = React.createClass({
		displayName: 'Games Slider',
		componentDidMount: function() {
			if (cache_games.length === 0) {
				$.get('/api/steam/games', function(result) {
					if (this.isMounted()) {
						cache_games = result;
						this.addRandomGames();
						this.setState({hasData: true});
					}
				}.bind(this));
			}
		},
		getInitialState: function() {
			return {
				hasData: false
			};
		},
		handleClick: function (ev) {
			var appid = ev.target.parentNode.dataset.appid;

			appDispatcher.dispatch({
				action: 'nav-item-update',
				type: 'site-nav',
				selectedItem: 'games'
			});
			appDispatcher.dispatch({
				action: 'game-list-item-update',
				selectedItem: appid
			});
		},
		handleArrow: function () {
			this.addRandomGames();

			// Force an update to display the new games.
			this.forceUpdate();
		},
		addRandomGames: function () {
			if (this.isMounted) {
				if (cache_games.length > 0) {
					var slider = this.refs.slider;
					var trays = slider.getElementsByClassName('slider-trays')[0];
					var count_subtrays = 2 * (Math.ceil(trays.clientWidth / 200));

					for (var i = 0; i < count_subtrays; i++) {
						var game = cache_games[random(0, cache_games.length - 1)];
						items.push({
							data: {appid: game.appid},
							image: React.createElement(GameLogo, game),
							onClick: this.handleClick
						});
					}
				}
			}
		},
		render: function () {
			return React.DOM.div({className: 'games-slider', style: style, ref: 'slider'},
				React.createElement(Slider, {
					items: items,
					title: 'Recommended Games',
					onArrowRight: this.handleArrow
				})
			);
		}
	});

})(window.React, window.jQuery);
