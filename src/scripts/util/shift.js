(function () {
	'use strict';

	function getLeft (element) {
		var left = 0;
		if (element.style.left.length > 0) {
			left = parseInt(element.style.left, 10);
		}
		return left;
	}

	function shift(element, direction, distance, callback) {
		var start = null;
		var left = getLeft(element);
		var end = left + (distance * direction);

		function step(timestamp) {
			if (!start) { start = timestamp; }
			var progress = timestamp - start;

			var new_left;
			if (direction === -1) {
				new_left = Math.max(left - progress, end);
			} else {
				new_left = Math.min(left + progress, end);
			}

			element.style.left = new_left + 'px';
			if (progress < distance) {
				window.requestAnimationFrame(step);
			} else if (typeof callback === 'function') {
				callback();
			}
		}
		window.requestAnimationFrame(step);
	}


	module.exports = {
		shiftLeft: function (element, distance) {
			shift(element, -1, distance);
		},
		shiftRight: function (element, distance) {
			shift(element, 1, distance);
		}
	};
})();
