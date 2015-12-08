(function () {
	'use strict';

	var appDispatcher = require('./AppDispatcher');
	var assign = require('object-assign');
	var EventEmitter = require('events').EventEmitter;

	var EventEmitter_base = assign({}, EventEmitter.prototype, {
		__: 'base',
		_handlers: {},
		_handleAction: function(action) {
			var type = action.type,
				handler = this._handlers[type];

			if (typeof handler === 'function') {
				handler(action);
			}
		},
		addHandler: function(actionType, handler) {
			this._handlers[actionType] = handler.bind(this);
		},
		addListener: function (event, callback) {
			this.on(event, callback);
		},
		dispatcherIndex: appDispatcher.register(function(action) {
			EventEmitter_base._handleAction(action);
			return true; // No errors. Needed by promise in Dispatcher.
		}),
		events: {}
	});

	module.exports = EventEmitter_base;

})();
