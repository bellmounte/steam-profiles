(function () {
	'use strict';

	var sorts = {
		name_game: function (a, b) {
			return a.displayName.toLowerCase().localeCompare(b.displayName.toLowerCase());
		},
		name_user: function (a, b) {
			return a.personaname.toLowerCase().localeCompare(b.personaname.toLowerCase());
		},
		achievements: function (a, b) {
			if (a.count_achievements !== b.count_achievements) {
				return b.count_achievements - a.count_achievements;
			}
			return sorts.name_game(a, b);
		},
		games: function (a, b) {
			if (a.count_games !== b.count_games) {
				return b.count_games - a.count_games;
			}
			return sorts.name(a, b);
		},
		owners: function (a, b) {
			if (a.count_owners !== b.count_owners) {
				return b.count_owners - a.count_owners;
			}
			return sorts.name_game(a, b);
		},
		playtime: function (a, b) {
			if (a.count_playtime !== b.count_playtime) {
				return b.count_playtime - a.count_playtime;
			}
			return sorts.name(a, b);
		}
	};

	module.exports = sorts;
})();
