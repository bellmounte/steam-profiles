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

})(window.jQuery);
