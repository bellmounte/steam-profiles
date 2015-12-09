(function ($) {
	'use strict';

	var appDispatcher = require('../../dispatcher/AppDispatcher');

	var EventEmitter = require('events').EventEmitter;
	var assign = require('object-assign');

	var CHANGE_EVENT = 'game-change';

	var _cache = [];

	var GameStore = assign({}, EventEmitter.prototype, {
		selectedGame: null,
		selectedGameData: null,
		emitChange: function () {
			this.emit(CHANGE_EVENT);
		},
		addChangeListener: function (callback) {
			this.on(CHANGE_EVENT, callback);
		},
		removeChangeListener: function (callback) {
			this.removeListener(CHANGE_EVENT, callback);
		},
		getSelectedGame: function () {
			return this.selectedGame;
		},
		getSelectedGameData: function () {
			return _cache[this.selectedGame];
		},

		// Data Methods that probably need to be located elsewhere
		getGame: function (appid) {
			return _cache[appid];
		},
		getGames: function () {
			return _cache;
		}
	});

	GameStore.dispatchToken = appDispatcher.register(function(action) {
		if (action.action === 'game-list-item-update') {
			GameStore.selectedGame = action.selectedItem;

			if (_cache[GameStore.selectedGame]) {
				GameStore.selectedGameData = _cache[GameStore.selectedGame];
			} else {
				$.ajax({
					url: '/api/steam/game/' + GameStore.selectedGame
				}).done(function(data){
					_cache[GameStore.selectedGame] = data;
					GameStore.selectedGameData = _cache[GameStore.selectedGame];
					GameStore.emitChange();
				});
			}

			GameStore.emitChange();

		} else if (action.action === 'nav-item-update' && action.type === 'site-nav') {
			GameStore.selectedGame = null;
			GameStore.emitChange();
		}
	});

	module.exports = GameStore;

	// Data Fixture
	var img_base = 'http://cdn.akamai.steamstatic.com/steamcommunity/public/images/apps/';

	_cache[233450] = {
		appid: 233450,
		img: img_base + '233450/fe2f32349f62c1a5d6ee48abd87a6232d32724d1.jpg',
		gameName: 'Prison Architect',
		count_owners: 1000
	};

	_cache[570] = {
		appid: 570,
		img: img_base + '570/d4f836839254be08d8e9dd333ecc9a01782c26d2.jpg',
		gameName: 'Dota 2',
		count_owners: 1000
	};

	_cache[252950] = {
		appid: 252950,
		img: img_base + '252950/58d7334290672887fdd47e25251f291b812c895e.jpg',
		gameName: 'Rocket League',
		count_owners: 1000,
		average_completion: 59.8
	};

	// Axiom Verge
	_cache[332200] = {
		appid: 332200,
		img: img_base + '332200/97fb318cd65ab72a7fe8f6fcf9cf6e4ab8f36204.jpg',
		gameName: 'Axiom Verge',
		count_owners: 1000,
		average_completion: 59.8,
		count_achievements: 29
	};

})(window.jQuery);
