(function (React, $) {
	'use strict';

	var AchievementItem = React.createClass({
		displayName: 'AchievementItem',
		render: function () {
			return React.createElement('li', {className: 'achievement-item'},

				React.createElement('div', {className: 'achievement-logo'},
					React.createElement('img', {className: 'achievement-image', src: this.props.icon})
				),
				React.createElement('div', {className: 'achievement-text'},
					React.createElement('div', {className: 'achievement-name'}, this.props.displayName),
					React.createElement('div', {className: 'achievement-description'}, this.props.description)
				)
			);
		}
	});

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

				var createAchievement = function (achievement) {
					achievement.type = 'achievement';
					achievement.key = achievement.name;
					achievement.uid = achievement.name;

					return React.createElement(AchievementItem, achievement);
				};

				var achievements;
				if (game.achievements) {
					achievements = game.achievements.map(createAchievement);
				}

				return React.createElement('div', {className: 'game'},
					React.createElement('header', {className: 'game-header'},
						React.DOM.h1({className: 'game-name'}, game.gameName),
						React.DOM.img({ alt:game.gameName, src: game.img, className: 'game-logo' })
					),
					React.createElement('ul', {className: 'game-achievements'},
						achievements
					)
				);
			} else {
				return React.createElement('div', {className: 'game'}, 'Loading');
			}
		}
	});

})(window.React, window.jQuery);
