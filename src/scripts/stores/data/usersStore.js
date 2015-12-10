(function () {
	'use strict';

	var appDispatcher = require('../../dispatcher/AppDispatcher');

	var EventEmitter = require('events').EventEmitter;
	var assign = require('object-assign');

	var CHANGE_EVENT = 'user-change';

	var UsersStore = assign({}, EventEmitter.prototype, {
		selectedUser: null,
		emitChange: function () {
			this.emit(CHANGE_EVENT);
		},
		addChangeListener: function (callback) {
			this.on(CHANGE_EVENT, callback);
		},
		removeChangeListener: function (callback) {
			this.removeListener(CHANGE_EVENT, callback);
		},
		getSelectedUser: function () {
			return this.selectedUser;
		}
	});

	UsersStore.dispatchToken = appDispatcher.register(function(action) {
		if (action.action === 'user-list-item-update') {
			UsersStore.selectedUser = action.selectedItem;
			UsersStore.emitChange();

		} else if (action.action === 'nav-item-update' && action.type === 'site-nav') {
			UsersStore.selectedUser = null;
			UsersStore.emitChange();
		}
	});

	module.exports = UsersStore;

})();
