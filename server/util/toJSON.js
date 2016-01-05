'use strict';

export default function (item) {
	const type = typeof(item);
	if (type === 'undefined') {
		return;
	}

	if (type === 'string') {
		return JSON.parse(item);
	}

	return item;
};
