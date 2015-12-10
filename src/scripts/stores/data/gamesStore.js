(function () {
	'use strict';

	var appDispatcher = require('../../dispatcher/AppDispatcher');

	var EventEmitter = require('events').EventEmitter;
	var assign = require('object-assign');

	var CHANGE_EVENT = 'game-change';

	var GameStore = assign({}, EventEmitter.prototype, {
		selectedGame: null,
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
		}
	});

	GameStore.dispatchToken = appDispatcher.register(function(action) {
		if (action.action === 'game-list-item-update') {
			GameStore.selectedGame = action.selectedItem;
			GameStore.emitChange();

		} else if (action.action === 'nav-item-update' && action.type === 'site-nav') {
			GameStore.selectedGame = null;
			GameStore.emitChange();
		}
	});

	module.exports = GameStore;

})();
