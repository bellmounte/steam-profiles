(function () {
	'use strict';

	var appDispatcher = require('../dispatcher/AppDispatcher');

	var EventEmitter = require('events').EventEmitter;
	var assign = require('object-assign');

	var CHANGE_EVENT = 'page-change';

	var PageStore = assign({}, EventEmitter.prototype, {
		page: 'home',
		emitChange: function () {
			this.emit(CHANGE_EVENT);
		},
		addChangeListener: function (callback) {
			this.on(CHANGE_EVENT, callback);
		},
		removeChangeListener: function (callback) {
			this.removeListener(CHANGE_EVENT, callback);
		},
		getPage: function () {
			return this.page;
		}
	});

	PageStore.dispatchToken = appDispatcher.register(function(action) {
		if (action.action === 'nav-item-update' && action.type === 'site-nav') {
			PageStore.page = action.selectedItem;
			PageStore.emitChange();
		}
	});

	module.exports = PageStore;

})();
