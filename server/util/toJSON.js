(function () {
	'use strict';

	module.exports = function (item) {
		var type = typeof(item);
		if (type === 'undefined') {
			return;
		} else if (type === 'string') {
			return JSON.parse(item);
		} else {
			return item;
		}
	};

})();
