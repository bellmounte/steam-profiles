(function (React, $) {
	'use strict';

	var AchievementItem = require('./game-achievement-item');

	var createAchievement = function (achievement) {
		achievement.type = 'achievement';
		achievement.key = achievement.name;
		achievement.uid = achievement.name;

		return React.createElement(AchievementItem, achievement);
	};

	var GameLaunchButton = require('./game-launch-button');
	var GameLogo = require('./game-logo');
	var GameName = require('./game-name');

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

				return React.DOM.div({className: 'game'},
					React.DOM.header({className: 'game-header'},
						React.createElement(GameName, game),
						React.createElement(GameLogo, game),
						React.DOM.div({className: 'game-launch'},
							React.createElement(GameLaunchButton, this.props)
						)
					),
					React.DOM.ul({className: 'game-achievements'},
						achievements
					)
				);
			} else {
				return React.DOM.div({className: 'game loading'});
			}
		}
	});

})(window.React, window.jQuery);
