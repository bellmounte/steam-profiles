(function (React, $) {
	'use strict';

	var AchievementItem = require('./game-achievement-item');

	var createAchievement = function (achievement) {
		achievement.type = 'achievement';
		achievement.key = achievement.name;
		achievement.uid = achievement.name;

		return React.createElement(AchievementItem, achievement);
	};

	var GameName = require('./game-name');
	var GameLogo = require('./game-logo');

	module.exports = React.createClass({
		displayName: 'Game',
		getInitialState: function() {
			return {
				game: null
			};
		},
		componentDidMount: function() {
			$.get('/api/steam/game/' + this.props.appid, function(result) {
				if (this.isMounted()) {
					this.setState({game: result});
				}
			}.bind(this));
		},
		render: function () {

			if (this.state.game) {
				var game = this.state.game;
				var achievements;
				if (game.achievements) {
					achievements = game.achievements.map(createAchievement);
				}

				return React.createElement('div', {className: 'game'},
					React.createElement('header', {className: 'game-header'},
						React.createElement(GameName, game),
						React.createElement(GameLogo, game)
					),
					React.createElement('ul', {className: 'game-achievements'},
						achievements
					)
				);
			} else {
				return React.createElement('div', {className: 'game loading'}, 'Loading');
			}
		}
	});

})(window.React, window.jQuery);
